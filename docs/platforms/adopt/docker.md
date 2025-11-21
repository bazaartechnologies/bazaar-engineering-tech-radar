---
title: Docker
ring: adopt
quadrant: platforms
tags: [containerization, devops, infrastructure]
---

# Docker

## Description

Docker is a platform for developing, shipping, and running applications in containers. Containers package applications with all their dependencies, ensuring consistency across development, testing, and production environments.

## Why Adopt?

Docker is essential to our infrastructure and development workflow:

- **Consistency**: "Works on my machine" is a thing of the past
- **Isolation**: Applications run in isolated environments
- **Efficiency**: Lightweight compared to virtual machines
- **Portability**: Deploy anywhere Docker runs
- **Developer Experience**: Simplified local development setup

## Our Experience

Docker is used across our entire development lifecycle:

- Local development environments
- CI/CD pipelines
- Production deployment on Kubernetes
- Testing environments
- Database and service dependencies in development

Every new service is containerized from day one.

## Recommendations

### Dockerfile Best Practices

- Use official base images
- Use multi-stage builds to reduce image size
- Don't run as root - create a non-root user
- Use `.dockerignore` to exclude unnecessary files
- Pin base image versions (avoid `latest` tag)
- Minimize layers
- Use build cache effectively

### Security

```dockerfile
# Example secure Dockerfile
FROM python:3.11-slim

# Create non-root user
RUN useradd -m -u 1000 appuser

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=appuser:appuser . .

USER appuser

CMD ["python", "app.py"]
```

### Development Setup

- Use Docker Compose for multi-container applications
- Mount volumes for hot-reloading during development
- Use named volumes for persistent data
- Document setup in README

## Common Pitfalls

- **Large images**: Use alpine or slim variants
- **Security issues**: Always run as non-root user
- **Build cache**: Optimize layer order (dependencies before code)
- **Secrets**: Never bake secrets into images

## Related Technologies

- Kubernetes (Adopt)
- Docker Compose (Adopt)
- GitHub Actions (Trial)

## Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- Internal Wiki: Docker Guidelines

## Last Updated

November 2025

