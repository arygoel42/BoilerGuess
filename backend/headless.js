const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const usernames = [
    "arjun",
    "ananya",
    "vivek",
    "prajwal",
    "krishna",
    "isha",
    "rohit",
    "neha",
    "priya",
    "deepak",
    "madhuri",
    "manoj",
    "puneet",
    "rajesh",
    "amrita",
    "varun",
    "shivani",
    "yash",
    "parth",
    "sanya",
    "nisha",
    "kartik",
    "ayesha",
    "ankit",
    "ravi",
    "meera",
    "chirag",
    "sunita",
    "sahil",
    "anil",
    "avni",
    "sudhir",
    "priyanka",
    "amit",
    "jyoti",
    "sunil",
    "sonal",
    "bhavya",
    "ranjan",
    "tanvi",
    "manisha",
    "harsha",
    "alisha",
    "ravi",
    "radhika",
    "bipin",
    "kiran",
    "pranjal",
    "geeta",
    "dinesh",
    "ritu",
    "kamal",
    "neelam",
    "rohit",
    "manish",
    "deepali",
    "tanya",
    "naveen",
    "kavita",
    "gaurav",
    "pushpa",
    "sumit",
    "ayush",
    "kavya",
    "abhinav",
    "nimisha",
    "vishal",
    "ruchi",
    "sandeep",
    "amisha",
    "ajay",
    "mukul",
    "sona",
    "nashit",
    "kapil",
    "kishore",
    "shivendra",
    "nikita",
    "jayant",
    "radhika",
    "amrit",
    "hemant",
    "arvind",
    "nirmal",
    "prabhjot",
    "arvindkumar",
    "manju",
    "alina",
    "mayur",
    "harleen",
    "komal",
    "ashok",
    "sheetal",
    "ishaan",
    "prathiba",
    "bhuvan",
    "preeti",
    "dhruv",
    "palak",
  ];

  const yThreshold = 400;

  for (let i = 0; i < 100; i++) {
    console.log(`Creating account ${i + 1} of 100`);

    const username = usernames[i];
    const password = `pass${Math.floor(Math.random() * 10000)}`;
    const email = `user${Math.floor(Math.random() * 10000)}@example.com`;

    try {
      await page.goto("https://purdue-geoguessr.vercel.app/signup");

      await page.waitForSelector("#username");
      await page.type("#username", username);

      await page.waitForSelector("#password");
      await page.type("#password", password);

      await page.waitForSelector("#email");
      await page.type("#email", email);

      await page.waitForSelector("#submit");
      await page.click("#submit");

      await page.waitForNavigation({ timeout: 5000 }).catch(() => {
        console.log("Signup confirmation did not occur; continuing.");
      });

      console.log(
        `Successfully created account ${
          i + 1
        } with username: ${username} and email: ${email}`
      );

      const gamesToPlay = Math.floor(Math.random() * 3) + 1;
      console.log(`Player ${username} will play ${gamesToPlay} game(s).`);

      await page.goto("https://purdue-geoguessr.vercel.app/game/Normal");

      for (let game = 1; game <= gamesToPlay; game++) {
        console.log(`Playing game ${game} for player ${username}.`);

        const points = Math.floor(Math.random() * 20000);
        const accuracy = Math.floor(Math.random() * 100);
        const time = Math.floor(Math.random() * 100);
        const hardMode = false;
        const streak = Math.floor(Math.random() * 5) + 1;

        // Use Puppeteer's page.evaluate() to get the token from localStorage in the browser context
        const token = await page.evaluate(() => {
          return localStorage.getItem("token");
        });

        let response = await fetch(
          `https://purdue-geoguessr.vercel.app/api/game/End`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              token: token,
              points: points,
              streak: streak,
              Accuracy: accuracy,
              hardMode: hardMode,
              time: time,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error playing game for player");
        }
      }

      console.log(`Finished all games for player ${username}.`);

      await page.goto("https://purdue-geoguessr.vercel.app/profile");
      await page.waitForSelector("#logout");
      await page.click("#logout");
    } catch (error) {
      console.error(`Error creating or playing for account ${i + 1}:`, error);
    }
  }

  await browser.close();
})();
