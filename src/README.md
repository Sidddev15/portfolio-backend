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
