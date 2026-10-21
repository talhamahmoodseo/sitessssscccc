import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { about as A } from "./about/content";
import Hero from "./about/Hero";
import { Beliefs, Manifesto } from "./about/Story";
import { Apart, Explore, Focus, Numbers, Quote } from "./about/Sections";

/**
 * /about. Kept short on purpose; every section has one job:
 * who we are → the numbers → what we specialise in → how we work → why
 * clients trust us → a client in their words → where to go next.
 */
const About = () => (
  <PageLayout>
    <Seo title={A.seo.title} description={A.seo.description} />
    <Hero />
    <Manifesto />
    <Numbers />
    <Focus />
    <Beliefs />
    <Apart />
    <Quote />
    <Explore />
  </PageLayout>
);

export default About;
