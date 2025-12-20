"use client";

import { CustomButton } from "@/components/reusable/customButton";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const AboutPage = () => {
  const router = useRouter();

  return (
    <main className="py-20 sm:py-[100px] px-5 sm:px-[100px] bg-background-static text-text-color-static/80 max-w-[2000px] animate-on-load">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="w-full flex items-start justify-between gap-5 mb-10">
          <CustomButton
            type="standard"
            className="w-auto p-2 text-text-color-static bg-background-muted-static border-foreground-static/80"
            onClick={() => router.back()}
          >
            <IoChevronBackOutline />
          </CustomButton>
          <CustomButton
            type="standard"
            className="w-auto text-text-color-static bg-background-muted-static border-foreground-static/80"
            onClick={() => router.push("/")}
          >
            Go To App
          </CustomButton>
        </div>

        {/* Overview Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold font-InstrumentSans text-text-color-static">
            Overview
          </h1>
          <article className="space-y-4 leading-relaxed">
            <p>
              The Time Cube is a simple visualizer that shows time as a series
              of slowly filling cubes. Each cube represents a time period. It
              could be an hour, a day, a week, or more, depending on the mode
              you choose. As time passes, the cubes gradually fill, giving you a
              clear sense of how much time is left.
            </p>
            <p>
              The whole point is to make time feel less abstract. When someone
              says you have two years until something happens, it’s easy to feel
              like that’s forever. But when you see those years represented
              visually, you realize just how short they really are. Time becomes
              something you can grasp. That shift in perspective can help you
              take action, stop procrastinating, and stay focused on what
              matters.
            </p>
          </article>
        </section>

        {/* Usage Guide Section */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            Usage Guide
          </h2>
          <article className="leading-relaxed">
            <ul className="list-disc ml-6 space-y-3">
              <li>
                The cube duration is how long each cube is. If you select one
                week, each cube will represent one week.
              </li>
              <li>
                Different modes serve different purposes. An example is the day
                mode, which shows how much time has passed on the same day
                you're viewing the site.
              </li>
              <li>
                When the mode changes, cubes are automatically generated. The
                duration is adjusted to prevent generating too many or too
                little cubes.
              </li>
              <li>
                The timer is a countdown. As the time reduces, the cubes
                gradually fill up, becoming entirely filled when the timer hits
                zero.
              </li>
              <li>
                There are many themes to choose from. Change the theme to your
                preferred one on the themes page.
              </li>
            </ul>
          </article>
        </section>

        {/* Reasoning Section */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            Reasoning
          </h2>
          <article className="space-y-4 leading-relaxed">
            <p>
              There is powerful evidence that the visualization of time can
              enhance attention, motivation, and planning. When individuals
              become more conscious of time slipping away, they're more likely
              to behave in manners that are better aligned with long-term
              objectives.
            </p>
            <p>
              Visualization closes the gap between your current self and your
              future self. Visual time trackers aid in minimizing
              procrastination by allowing time to be more concrete. Instead of
              saying "I'll have time later," you see it slowly being cubed up,
              giving rise to a sense of urgency.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
