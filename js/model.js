/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "moaadEZZ",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "ezzahirmoaad@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Revenue Forecasting & Market Referential",
      tag: "End of Studies · Orange Business", color: "#ff7900",
      url: "https://github.com/moaadEZZ/Revenue_Forecasting", cta: "02-2026 / 08-2026",
      img: "assets/projects/revenue.png",
      desc: "Two complementary approaches to forecast 5-year revenue: a Machine Learning model reaching an R² of 0.6 on skewed historical data, and an ETL pipeline mapping the revenue database against external Market CAGR estimations. Cut manual forecasting time by 90%.",
    },
    {
      title: "Rain and Cloud Analyses",
      tag: "Time Series · Deep Learning", color: "#3dff6e",
      url: "https://github.com/moaadEZZ/RainDetection", cta: "10-2025 / 01-2026",
      img: "assets/projects/rain.png",
      desc: "Group project building AI models to predict temperature and the presence of rain. Benchmarked multiple time-series models (RNN, LSTM, ARIMA, SARIMA) to find the most performant one.",
    },
    {
      title: "SmartChess Application",
      tag: "AI Agent · Web App", color: "#ffffff",
      url: "https://github.com/moaadEZZ/SmartChess", cta: "06-2025 / 07-2025",
      img: "assets/projects/smartchess.png",
      desc: "A ChatGPT-like web application powered by a trained AI agent: users can chat, play chess, or get information about the game, all driven by their prompt.",
    },
    {
      title: "Spam Request Detection",
      tag: "NLP · Classification", color: "#3178c6",
      url: "https://github.com/moaadEZZ/DemandeAnalyse", cta: "08-2025 / 09-2025",
      img: "assets/projects/spam.png",
      desc: "Built during my internship at the Ministry of Youth, Culture and Communication (IT Department): an app that classifies incoming requests as spam to decide whether they should be accepted or refused.",
    },
    {
      title: "Automatic Speech Recognition",
      tag: "Speech · Hugging Face", color: "#f1e05a",
      url: "https://github.com/moaadEZZ", cta: "10-2025 / 11-2025",
      img: "assets/projects/asr.png",
      desc: "Enables the transformation of text into speech and vice versa, built with Machine Learning tools and Hugging Face datasets.",
    },
    {
      title: "NLP Application with AirByte",
      tag: "Big Data · Spark", color: "#DA5B0B",
      url: "https://github.com/moaadEZZ", cta: "10-2025 / 11-2025",
      img: "assets/projects/airbyte.png",
      desc: "A Big Data pipeline using AirByte to extract data and stream it to Spark without downloading it locally, in order to train an NLP model.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "Revenue_Forecasting", "Revenue_CAGR_Estimator", "RainDetection", "SmartChess", "DemandeAnalyse",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "moaadEZZ", language: "GitHub", stargazers_count: 0,
      html_url: "https://github.com/moaadEZZ",
      description: "Couldn't reach GitHub right now. Click to browse all my repositories.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26", Scala: "#c22d40",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen (levels are self-estimates, tweak freely) ----
  skills: [
    { group: "Machine Learning · AI", items: [
      ["PyTorch · TensorFlow · Scikit-learn", 85], ["Pandas · NumPy", 90],
      ["CNN · RNN · LSTM · GNN · Transformers", 82], ["KNN · Regression · Trees · Random Forest · K-means", 88],
      ["Computer Vision", 75], ["Regularisation: Early stopping · Dropout · L1/L2", 80],
    ]},
    { group: "Big Data & Databases", items: [
      ["Spark · Hadoop · Hive · Kafka", 80], ["ETL · ELT Pipelines", 85],
      ["SQL", 88], ["MongoDB · Neo4j", 75],
    ]},
    { group: "Cloud, DevOps & MLOps", items: [
      ["Microsoft Azure · Databricks", 78], ["MLflow", 76],
      ["Docker · Kubernetes", 74], ["FastAPI · Serverless", 78], ["GitHub · CI/CD", 82],
    ]},
    { group: "Programming Languages", items: [
      ["Python", 92], ["Java", 80], ["C · C++", 75], ["Scala", 70],
    ]},
    { group: "Languages", items: [
      ["English (Advanced)", 85], ["French (Upper Intermediate)", 75], ["Arabic (Intermediate)", 60],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
