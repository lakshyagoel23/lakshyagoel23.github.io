log("Welcome to a new online simulated terminal! Type help to get started!");


var projects = [
  {
    name: "AI Learns To Play Flappy Birds using NEAT Algorithm",
    description: "Developed an AI agent to play Flappy Bird using the NEAT algorithm. Demonstrates neural network evolution and genetic algorithms in a real-time environment. Key Skills: Python, NEAT Algorithm, Neural Networks, Pygame, Genetic Algorithms, AI Model Development",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/flappy-bird-neat"
  },
  {
    name: "Teaching Rockets To Tackle Obstacles Using Genetic Algorithm",
    description: "Developed a simulation where rockets learn to navigate obstacles using a genetic algorithm in JavaScript. Demonstrates skills in AI, problem-solving, and JavaScript programming. Key Skills: JavaScript, Genetic Algorithms, AI Simulation, Problem-Solving, Algorithm Optimization",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/rocket-obstacles-js"
  },
  {
    name: "Converting Text To Images Using Stable Diffusion",
    description: "Developed a system that generates images from text descriptions using Stable Diffusion. Showcases skills in deep learning and image synthesis. Key Skills: Stable Diffusion, Deep Learning, Image Synthesis, NLP",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/text-to-image"
  },
  {
    name: "Basic Server To Allow Multi-Player Game (Copy of agar.io)",
    description: "Created a server for a multi-player game similar to Agar.io using PHP and JavaScript. Enables real-time interactions and game state management. Key Skills: PHP, JavaScript, Real-Time Networking, Game Development, Server-Side Scripting",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/multiplayer-game-server"
  },
  {
    name: "2D Web Based Game (Copy of PVZ)",
    description: "Developed a 2D web-based game replicating the gameplay of Plants vs. Zombies, utilizing HTML, CSS, and JavaScript for interactive and responsive game design. Key Skills: HTML, CSS, JavaScript, Game Development, Interactive Design",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/2d-web-game"
  },
  {
    name: "3D Web Based Basic Game using THREE.js",
    description: "Created a 3D web-based game using THREE.js, implementing interactive 3D graphics and real-time rendering with custom physics for an engaging user experience. Key Skills: THREE.js, 3D Graphics, Web Development, Real-Time Rendering",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/3d-web-game"
  },
  {
    name: "Copy of Facebook (GoChat, abandoned)",
    description: "Developed a social networking platform similar to Facebook, named GoChat, using PHP, SQL, AJAX, and JavaScript for user profiles, messaging, and social features. The project was eventually abandoned. Key Skills: PHP, SQL, AJAX, JavaScript, Web Development, Social Networking Features",
    // Replace with a link to a relevant online resource like a blog post or GitHub repository
    link: "https://placeholder.com/gochat-abandoned"
  },
  {
    name: "Movie Recommendation System",
    description: "Developed a movie recommendation system using collaborative filtering and content-based algorithms to provide personalized movie suggestions. Implemented the system using Python for data processing and a web interface for user interaction. Key Skills: Python, Collaborative Filtering, Content-Based Recommendation, Data Processing, Web Development",
    // Replace with a link to your project's website or a relevant online resource
    link: "https://placeholder.com/movie-recommendation"
  }
];


// Example Command - Hey

register_cmd("hey", function(cmd) {
    var parameters = cmd.split(" ").slice(1);
    for (var i = 0; i < parameters.length; i++) {
        block_log("Hello " + parameters[i]);
    }
});

// Example Command - Sum

register_cmd("sum", function(cmd) {
    var parameters = cmd.split(" ").slice(1);
    var sum = 0;
    for (var i = 0; i < parameters.length; i++) {
        sum += parseInt(parameters[i]);
    }
    block_log("Sum: " + cmd);
});


// Register commands using register_cmd
  register_cmd('ls', function() {
    // List of projects logic
    block_log('List of projects:\n');
    projects.forEach((project, index) => {
      block_log(`${index + 1}. ${project.name}`);
      block_log("use command show followed by respective number to know more about a project, eg, show 1");
    });
  });



register_cmd('show', function(cmd) {
  const n = cmd.split(" ").slice(1);
  if (n > 0 && n < 9) {
    block_log(`Name: ${projects[n].name}`);
    block_log(`Description: ${projects[n].description}`);
    block_log(`Link: <a href=' ${projects[n].link} 'target="_blank"> ${projects[n].link} </a>`);
  } else {
    block_log('Invalid project number.');
  }
});





  register_cmd('help', function() {
    // Help command logic
    block_log('Available commands: ls, help, show');
  });



update_user_title("Lakshya Goel");