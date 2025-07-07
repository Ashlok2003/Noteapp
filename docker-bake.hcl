group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "./client"
  dockerfile = "./client/Dockerfile"
  tags = ["note-app-frontend:latest"]
}

target "backend" {
  context = "."
  dockerfile = "./Dockerfile"
  tags = ["note-app-backend:latest"]
}
