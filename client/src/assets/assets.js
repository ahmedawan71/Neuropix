import logo from "./logo.png";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
};

export const stepsData = [
  {
    title: "Share Your Idea",
    description:
      "Write a short phrase, sentence, or detailed description of the image you'd like to see.",
    icon: step_icon_1,
  },
  {   
    title: "See It Come Alive",
    description:
      "Our AI instantly turns your words into a stunning, one-of-a-kind image within moments.",
    icon: step_icon_2,
  },
  {
    title: "Save & Showcase",
    description:
      "Download your artwork right away or share it with friends and the world in a click.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Donald Jackman",
    role: "Graphic Designer",
    stars: 5,
    text: `This AI image generator has completely changed my workflow. I can create unique visuals in minutes instead of hours — it's like having a creative assistant on demand.`,
  },
  {
    image: profile_img_3,
    name: "Richard Nelson",
    role: "Content Creator",
    stars: 5,
    text: `Perfect for my content! I just type a prompt, and it generates stunning images that I can use for social posts and thumbnails. Super easy to use and always impressive.`,
  },
  {
    image: profile_img_2,
    name: "Sarah Mitchell",
    role: "Marketing Specialist",
    stars: 4,
    text: `I've used it for ads, presentations, and brainstorming ideas. It saves so much time and sparks creativity when I need fresh visuals. Highly recommend!`,
  },
];


export const plans = [
  {
    id: "Basic",
    price: 10,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 50,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];
