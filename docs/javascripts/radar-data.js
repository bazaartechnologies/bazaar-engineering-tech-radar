// Auto-generated radar data
// Generated from markdown files in docs/

const radarData = {
  "technologies": [
    {
      "name": "CI/CD",
      "quadrant": 0,
      "ring": 0,
      "tags": [
        "automation",
        "devops",
        "deployment"
      ],
      "description": "CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development. It encompasses continuous integration (automated testing of code changes) and continuous deployment (automated release to production).",
      "url": "techniques/adopt/ci-cd.html"
    },
    {
      "name": "Git",
      "quadrant": 1,
      "ring": 0,
      "tags": [
        "version-control",
        "collaboration"
      ],
      "description": "Git is a distributed version control system for tracking changes in source code during software development. It enables multiple developers to work together on the same codebase efficiently.",
      "url": "tools/adopt/git.html"
    },
    {
      "name": "Docker",
      "quadrant": 2,
      "ring": 0,
      "tags": [
        "containerization",
        "devops",
        "infrastructure"
      ],
      "description": "Docker is a platform for developing, shipping, and running applications in containers. Containers package applications with all their dependencies, ensuring consistency across development, testing, and production environments.",
      "url": "platforms/adopt/docker.html"
    },
    {
      "name": "Kubernetes",
      "quadrant": 2,
      "ring": 2,
      "tags": [
        "orchestration",
        "containers",
        "infrastructure"
      ],
      "description": "Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.",
      "url": "platforms/assess/kubernetes.html"
    },
    {
      "name": "Python",
      "quadrant": 3,
      "ring": 0,
      "tags": [
        "backend",
        "data-science",
        "automation"
      ],
      "description": "Python is a high-level, interpreted programming language known for its simplicity and readability. It has a vast ecosystem of libraries and frameworks, making it suitable for web development, data science, automation, and more.",
      "url": "languages-frameworks/adopt/python.html"
    },
    {
      "name": "TypeScript",
      "quadrant": 3,
      "ring": 0,
      "tags": [
        "frontend",
        "javascript",
        "type-safety"
      ],
      "description": "TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and interfaces to JavaScript, enabling better tooling and catching errors at compile time.",
      "url": "languages-frameworks/adopt/typescript.html"
    },
    {
      "name": "Rust",
      "quadrant": 3,
      "ring": 1,
      "tags": [
        "systems-programming",
        "performance",
        "safety"
      ],
      "description": "Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. It achieves memory safety without using garbage collection.",
      "url": "languages-frameworks/trial/rust.html"
    }
  ],
  "quadrants": [
    {
      "name": "Techniques",
      "id": 0
    },
    {
      "name": "Tools",
      "id": 1
    },
    {
      "name": "Platforms",
      "id": 2
    },
    {
      "name": "Languages & Frameworks",
      "id": 3
    }
  ],
  "rings": [
    {
      "name": "Adopt",
      "id": 0,
      "color": "#93c47d"
    },
    {
      "name": "Trial",
      "id": 1,
      "color": "#93d2f3"
    },
    {
      "name": "Assess",
      "id": 2,
      "color": "#fbdb84"
    },
    {
      "name": "Hold",
      "id": 3,
      "color": "#efafa9"
    }
  ]
};

// Make it available globally
if (typeof window !== 'undefined') {
    window.radarData = radarData;
}
