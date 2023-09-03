const corsOptions = {
  origin: [
    "http://localhost:4000",
    "https://raul-perez-final-project-202307-bcn.netlify.app/",
  ],
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default corsOptions;
