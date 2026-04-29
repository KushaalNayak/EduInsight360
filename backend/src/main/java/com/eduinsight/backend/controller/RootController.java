package com.eduinsight.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

@RestController
public class RootController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> index() {
        String html = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>EduInsight360 | API Portal</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
                <style>
                    :root { --primary: #6366f1; --bg: #0f172a; --card: #1e293b; --text: #f8fafc; }
                    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; overflow: hidden; }
                    .container { text-align: center; background: var(--card); padding: 3rem; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); max-width: 500px; width: 90%; }
                    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(to right, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                    .status { display: inline-flex; align-items: center; gap: 8px; background: rgba(34, 197, 94, 0.1); color: #4ade80; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; margin-bottom: 2rem; }
                    .status-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 10px #4ade80; }
                    p { color: #94a3b8; line-height: 1.6; margin-bottom: 2rem; }
                    .btn-group { display: flex; flex-direction: column; gap: 12px; }
                    .btn { display: inline-block; background: var(--primary); color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4); }
                    .btn:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4); background: #4f46e5; }
                    .btn-secondary { background: rgba(255,255,255,0.05); color: #94a3b8; box-shadow: none; border: 1px solid rgba(255,255,255,0.1); }
                    .btn-secondary:hover { background: rgba(255,255,255,0.1); color: white; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="status"><span class="status-dot"></span> System Operational</div>
                    <h1>EduInsight360</h1>
                    <p>Production API Server for EduInsight360 Analytics Portal. Authorized Access Only.</p>
                    <div class="btn-group">
                        <a href="/swagger-ui/index.html" class="btn">Explore API Documentation</a>
                        <a href="https://edu-insight360.vercel.app/" class="btn btn-secondary">Open Frontend Portal</a>
                    </div>
                </div>
            </body>
            </html>
            """;
        return ResponseEntity.ok(html);
    }
}
