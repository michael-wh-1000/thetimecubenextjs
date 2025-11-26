"use client";

import { CustomButton } from "@/components/reusable/customButton";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const AboutPage = () => {
  const router = useRouter();
  return (
    <>
      <main className="pt-20 sm:pt-[100px] flex flex-col gap-5 sm:gap-[25px] md:gap-[30px] lg:gap-[35px] px-5 sm:px-[100px] bg-background text-text-color animate-on-load max-w-[2000px]">
        <section className="flex flex-col gap-2">
          <div className="w-full flex items-start justify-between  gap-5">
            <CustomButton
              type="standard"
              className="w-auto p-2"
              onClick={() => router.back()}
            >
              <IoChevronBackOutline />
            </CustomButton>
            <CustomButton
              type="standard"
              className="w-auto p-2"
              onClick={() => router.push("/")}
            >
              Go To App
            </CustomButton>
          </div>
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] heading-font font-semibold">
            Overview
          </h2>
          <article className="flex flex-col gap-2  text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-text-color/80">
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
        <section className="flex flex-col gap-2">
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] heading-font font-semibold">
            Usage Guide
          </h2>
          <article className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-text-color/80">
            <ul className="px-5 sm:px-[25px] md:px-[30px] ld:px-[35px] flex flex-col gap-2">
              <li className="list-disc">
                The cube duration is how long each cube is. If you select one
                week, each cube will represent one week. The same applies for
                every duration option available.
              </li>
              <li className="list-disc">
                Different modes serve different purposes. An example is the day
                mode, which shows how much time has passed on the same day
                you're viewing the site. Choose a mode that's appropriate for
                your needs.
              </li>
              <li className="list-disc">
                When the mode changes, cubes are automatically generated to
                satisfy the change. The duration option is also automatically
                adjusted to prevent generating too many or too little cubes.
              </li>
              <li className="list-disc">
                The timer is a countdown till the end of the period selection.
                As the time reduces, the cubes gradually fill up. The cubes will
                be entirely filled up when the timer hits zero.
              </li>
              <li className="list-disc">
                There are many themes to choose from. Change the theme to your
                preferred one on the themes page.
              </li>
            </ul>
          </article>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] heading-font font-semibold">
            Reasoning
          </h2>
          <article className="flex flex-col gap-2  text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-text-color/80">
            <p>
              There is powerful evidence that the visualization of time can
              enhance attention, motivation, and planning. When individuals
              become more conscious of time slipping away, they're more likely
              to behave in manners that are better aligned with long-term
              objectives.
            </p>
            <p>
              Visualization closes the gap between your current self and your
              future self, allowing for easier decision-making. Visual time
              trackers also aid in minimizing procrastination by allowing time
              to be more concrete. Instead of saying "I'll have time later," you
              see it slowly being cubed up, giving rise to a sense of urgency
              and provoking a response.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
