import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { about as A } from "./about/content";
import Hero from "./about/Hero";
import { Chapters, Manifesto } from "./about/Story";
import { Apart, Explore, Numbers, Quote, Team, Wont } from "./about/Sections";

/**
 * /about
 *
 * Story: who we are → why we exist → how we got here → the numbers → what
 * sets us apart → the team behind the work → what we won't do → a client in
 * their words → keep exploring → close. Plan: PAGES-REDESIGN-2.md §1.
 */
const About = () => (
  <PageLayout>
    <Seo title={A.seo.title} description={A.seo.description} />
    <Hero />
    <Manifesto />
    <Chapters />
    <Numbers />
    <Apart />
    <Team />
    <Wont />
    <Quote />
    <Explore />
  </PageLayout>
);

export default About;
