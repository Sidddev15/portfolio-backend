# health

curl -s http://localhost:5000/api/health

# projects

curl -s "http://localhost:5000/api/projects"
curl -s "http://localhost:5000/api/projects?featured=true"
curl -s "http://localhost:5000/api/projects?q=react&page=1&limit=12"

# experience

curl -s http://localhost:5000/api/experience

# education

curl -s http://localhost:5000/api/education

# techstack

curl -s http://localhost:5000/api/techstack
curl -s "http://localhost:5000/api/techstack?category=Frontend"

# OK case

curl -X POST http://localhost:5000/api/contact \
 -H "Content-Type: application/json" \
 -d '{"name":"John Doe","email":"john@example.com","subject":"Hello","message":"Nice portfolio! Keep it up.","page":"/contact"}'

# Honeypot (bot) case – server responds 204 No Content

curl -X POST http://localhost:5000/api/contact \
 -H "Content-Type: application/json" \
 -d '{"name":"Bot","email":"bot@example.com","subject":"spam","message":"buy now","hp":"filled"}'
