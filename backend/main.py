from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
import os
from datetime import datetime
from werkzeug.utils import secure_filename

# =========================
# App Setup
# =========================
app = Flask(__name__)
CORS(app)

# =========================
# Supabase Config
# =========================
SUPABASE_URL = os.getenv("SUPABASE_URL") 
SUPABASE_KEY = os.getenv("SUPABASE_KEY") 

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# =========================
# Health Check
# =========================
@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "OK",
        "service": "CampusAI Backend"
    })

# =========================
# Login API (Admin / Student)
# =========================
@app.route("/login", methods=["POST"])
def login():
    print("LOGIN HIT", request.method, request.headers.get("Content-Type"))

    try:
        data = request.get_json(silent=True)
        print("RAW DATA:", data)

        if not data or "email" not in data:
            return jsonify({
                "success": False,
                "message": "Email missing in request"
            }), 400

        email = data["email"].strip().lower()

        # Check ADMIN table
        admin_result = supabase.table("admin_login") \
            .select("email") \
            .eq("email", email) \
            .execute()

        if admin_result.data:
            return jsonify({
                "success": True,
                "role": "admin",
                "email": email
            }), 200

        # Check STUDENT table
        student_result = supabase.table("student_login") \
            .select("email") \
            .eq("email", email) \
            .execute()

        if student_result.data:
            return jsonify({
                "success": True,
                "role": "student",
                "email": email
            }), 200

        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    except Exception as e:
        print("🔥 BACKEND ERROR:", e)
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500

# =========================
# Admin Dashboard (Static)
# =========================
@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    try:
        # Fetch total number of students
        result = supabase.table("student_login") \
            .select("id", count="exact") \
            .execute()

        total_students = result.count

        return jsonify({
            "success": True,
            "total_students": total_students
        }), 200

    except Exception as e:
        print("🔥 STATS ERROR:", e)
        return jsonify({
            "success": False,
            "message": "Failed to fetch admin stats"
        }), 500

# =========================
# Student Dashboard (Static)
# =========================
@app.route("/student/dashboard", methods=["GET"])
def student_dashboard():
    return jsonify({
        "page": "Student Dashboard",
        "features": [
            "View personalized checklist",
            "Track deadlines",
            "View risk status"
        ]
    })

@app.route("/admin/upload-policy", methods=["POST"])
def upload_policy():
    try:
        file = request.files.get("file")
        uploaded_by = request.form.get("uploaded_by", "admin")

        if not file:
            return jsonify({"success": False, "message": "No file uploaded"}), 400

        filename = secure_filename(file.filename)
        file_path = f"policies/{filename}"

        # Upload to Supabase Storage
        supabase.storage.from_("policies").upload(
            file_path,
            file.read(),
            {"content-type": "application/pdf"}
        )

        # Get public URL
        public_url = supabase.storage.from_("policies").get_public_url(file_path)

        # Save metadata to DB
        supabase.table("admin_policies").insert({
            "policy_name": filename,
            "description": "Uploaded policy document",
            "file_url": public_url,
            "uploaded_by": uploaded_by
        }).execute()

        return jsonify({
            "success": True,
            "message": "Policy uploaded successfully",
            "file_url": public_url
        }), 200

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return jsonify({
            "success": False,
            "message": "Upload failed"
        }), 500
    
# =========================
# Run App
# =========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
