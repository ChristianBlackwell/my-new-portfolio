document.addEventListener("DOMContentLoaded", function () {
  const projects = [
    {
      title: "Movie Information Finder",
      description:
        "Movie Information Finder is a web application that allows users to search for information about movies. Users can search for movies by title, view details about a specific movie, and receive recommendations for random movies.",
      link: "https://christianblackwell.github.io/Movie-Information-Finder/",
      image: "/images/movie-info-finder.png",
      sourceCode:
        "https://github.com/ChristianBlackwell/Movie-Information-Finder", // Add this line
      technologies: [
        { name: "HTML", icon: "/images/html-logo.PNG", class: "html-icon" },
        { name: "CSS", icon: "/images/css-logo.PNG", class: "css-icon" },
        {
          name: "JavaScript",
          icon: "/images/javascript-logo.PNG",
          class: "js-icon",
        },
        {
          name: "TMDb API",
          icon: "/images/tmdb-logo.jpeg",
          class: "tmdb-icon",
        },
      ],
    },
    {
      title: "Weather App",
      description:
        "This is a simple weather app that allows users to check the weather for a specific city and state.",
      link: "https://christianblackwell.github.io/Weather-App/",
      image: "/images/weather-app.png",
      class: "weather-app-image",
      sourceCode: "https://github.com/ChristianBlackwell/Weather-App", // Add this line
      technologies: [
        { name: "HTML", icon: "/images/html-logo.PNG", class: "html-icon" },
        { name: "CSS", icon: "/images/css-logo.PNG", class: "css-icon" },
        {
          name: "JavaScript",
          icon: "/images/javascript-logo.PNG",
          class: "js-icon",
        },
        {
          name: "OpenWeatherMap API",
          icon: "/images/open-weather-logo.png",
          class: "weather-icon",
        },
      ],
    },
    {
      title: "Gender Reveal Website",
      description:
        "This Gender Reveal Website was one of my first projects, created just 5 days into my coding journey. Originally conceived as a playful idea, it quickly turned into a rewarding challenge and a nostalgic milestone in my learning process. <br></br> I’d approach it differently now with my expanded knowledge, but it remains a delightful reminder of where I started.",
      link: "https://christianblackwell.github.io/Gender-Reveal/",
      image: "/images/gender-reveal.png",
      // class: "weather-app-image",
      sourceCode: "https://github.com/ChristianBlackwell/Gender-Reveal", // Add this line
      technologies: [
        { name: "HTML", icon: "/images/html-logo.PNG", class: "html-icon" },
        { name: "CSS", icon: "/images/css-logo.PNG", class: "css-icon" },
        {
          name: "JavaScript",
          icon: "/images/javascript-logo.PNG",
          class: "js-icon",
        },
      ],
    },
    // Add more projects as needed
  ];

  const photoContainer = document.getElementById("photoContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;

  // Dynamically create project elements
  projects.forEach((project, index) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("carousel-item");
    if (index === currentIndex) {
      projectContainer.classList.add("active");
    }
    projectContainer.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <img src="${project.image}" alt="${project.title}" class="${
      project.class || ""
    }" />
    <div class="project-links">
      <a href="${project.link}" target="_blank" class="btn">Live Demo</a>
      <a href="${
        project.sourceCode
      }" target="_blank" class="btn">Source Code</a> <!-- Updated this line -->
    </div>
    <div class="technologies">
      <p>Technologies Used:</p>
      ${project.technologies
        .map(
          (tech) => `
        <span class="tech-icon ${tech.class}">
          <img src="${tech.icon}" alt="${tech.name}" />
        </span>
      `
        )
        .join("")}
    </div>
  `;

    photoContainer.appendChild(projectContainer);
  });

  function showNext() {
    if (currentIndex < projects.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function showPrevious() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = projects.length - 1;
    }
    updateCarousel();
  }

  function updateCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });
  }

  prevBtn.addEventListener("click", showPrevious);
  nextBtn.addEventListener("click", showNext);

  // Initialize carousel
  updateCarousel();
});
