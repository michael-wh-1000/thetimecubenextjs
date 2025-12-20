import { CustomButton } from "@/components/reusable/customButton";
import { DisplayGrid } from "./components/displayGrid";
import { CiGrid41 } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { PiPaletteLight } from "react-icons/pi";
import { PiGraphLight } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { SignUp } from "@/components/nonreusable/signup";
import { ScrollButton } from "./components/scrollbutton";
import { EmailWaitlist } from "./components/emailwaitlist";

const HomePage = () => {
  return (
    <>
      <main className="flex flex-col gap-5 sm:gap-[25px] md:gap-[30px] lg:gap-[35px] px-5 sm:px-[60px] text-text-color-static w-full relative overflow-hidden bg-background-static">
        <img
          src={"/images/backdrop.svg"}
          className="absolute -top-[200px] left-0 w-full min-w-[800px]"
        />
        <section className="w-full mt-[90px] sm:mt-[105px] md:mt-[120px] lg:mt-[135px] xl:mt-[150px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 relative z-5">
          <div className="flex flex-col items-center gap-12  md:gap-16 lg:gap-18 xl:gap-20">
            <div className="flex flex-col items-center gap-[30px]">
              <div className="flex flex-col items-center gap-[15px]">
                <h1 className="text-center font-InstrumentSans font-bold text-[36px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-none">
                  Visualize time like never before
                </h1>
                <h3 className="text-[14px] sm:text-[15.5px] md:text-[17px] lg:text-[18.5px] xl:text-[20px] max-w-[800px] text-center">
                  See your time as a grid of cubes. A clean, flexible way to
                  understand how time passes.
                </h3>
              </div>
              <div className="w-[50px] h-[50px] bg-text-color-static rounded-full shadow-custom blur-[80px] absolute -right-[150px] top-1/5 -z-10"></div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center w-full">
                <Link
                  href={"/app"}
                  prefetch={true}
                  className="w-full sm:w-fit max-w-[400px]"
                >
                  <CustomButton
                    type="accent"
                    className="justify-center text-background-static bg-foreground-muted-static border-foreground-muted-static"
                  >
                    Go to Web App
                  </CustomButton>
                </Link>
                <SignUp />
              </div>
            </div>
            <div className="-z-5 w-full">
              <DisplayGrid />
            </div>
          </div>
          <div className="w-[50px] h-[50px] bg-text-color-static rounded-full shadow-custom blur-[80px] absolute -left-[150px]"></div>
        </section>

        <section className="flex flex-col items-center gap-6  md:gap-8 lg:gap-12 xl:gap-16 max-w-[1600px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
          <h1 className="text-center font-InstrumentSans font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[44px] leading-none">
            Turn time into a visual experience
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 mx-auto">
            <div className="pl-4 py-6 sm:py-4 border-b-[0.5px] sm:border-b-0 sm:mb-4 lg:mb-0 flex flex-col gap-5">
              <CiGrid41 size={30} />
              <div>
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Visualize Any Time
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  Turn minutes, hours or days into a clear cube-based visual
                </span>
              </div>
            </div>
            <div className="pl-4 py-6 sm:py-4 sm:mb-4 lg:mb-0 border-b-[0.5px] sm:border-b-0 sm:border-l-[0.5px] flex flex-col gap-5">
              <CiClock1 size={30} />
              <div>
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Track Your Focus
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  See how your time is spent and spot patterns at a glance
                </span>
              </div>
            </div>
            <div className="pl-4 py-6 sm:py-4 border-b-[0.5px] sm:border-b-0 lg:border-l-[0.5px] flex flex-col gap-5">
              <PiPaletteLight size={30} />
              <div>
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Customizable Themes
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  Choose from multiple themes and create your own aesthetic
                </span>
              </div>
            </div>
            <div className="pl-4 py-6 sm:py-4 flex flex-col gap-5 sm:border-l-[0.5px]">
              <PiGraphLight size={30} />
              <div>
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Flexible Insights
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  Understand your time on any scale, from minutes to hours to
                  months
                </span>
              </div>
            </div>
          </div>
          <Link href={"/app"} prefetch={true}>
            <CustomButton
              type="accent"
              className="w-fit text-background-static bg-foreground-muted-static border-foreground-muted-static"
            >
              Try it Now
            </CustomButton>
          </Link>
        </section>
        <section className="flex flex-col items-center gap-6  md:gap-8 lg:gap-12 xl:gap-16 max-w-[1600px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 px-4 sm:px-0">
          <h1 className="text-center font-InstrumentSans font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[44px] leading-none">
            Features
          </h1>
          <div className="flex flex-col gap-8 sm:gap-12  md:gap-16 lg:gap-20 xl:gap-24">
            <div className="flex flex-col sm:flex-row items-center gap-[25px] sm:gap-[50px] md:gap-[75px] lg:gap-[100px]">
              <div className="w-full sm:w-1/2 max-w-[400px]">
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Grid time visualizer
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  Shows time in a cube format where each cube represents a time
                  period
                </span>
              </div>
              <img
                src={"/images/grid.svg"}
                className="w-full sm:w-[40%] lg:w-1/2 max-w-[400px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row-reverse items-center gap-[25px] sm:gap-[50px] md:gap-[75px] lg:gap-[100px]">
              <div className="w-full sm:w-1/2 max-w-[400px]">
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Multiple timers
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  Supports multiple trackers to track many things at the same
                  time
                </span>
              </div>
              <img
                src={"/images/cards.svg"}
                className="w-full sm:w-[40%] lg:w-1/2 max-w-[400px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-[25px] sm:gap-[50px] md:gap-[75px] lg:gap-[100px]">
              <div className="w-full sm:w-1/2 max-w-[400px]">
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Broad settings
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  You can track everything from the day to a fully custom period
                </span>
              </div>
              <img
                src={"/images/settings.svg"}
                className="w-full sm:w-[40%] lg:w-1/2 max-w-[400px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row-reverse items-center gap-[25px] sm:gap-[50px] md:gap-[75px] lg:gap-[100px]">
              <div className="w-full sm:w-1/2 max-w-[400px]">
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-bold font-InstrumentSans">
                  Dynamic themes
                </h4>
                <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  The TimeCube has many themes so you can create your own
                  aesthetic
                </span>
              </div>
              <img
                src={"/images/themes.svg"}
                className="w-full sm:w-[40%] lg:w-1/2 max-w-[400px]"
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-6  md:gap-8 lg:gap-12 xl:gap-16 max-w-[1600px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
          <h1 className="text-center font-InstrumentSans font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[44px] leading-none">
            Coming soon: Mobile App
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-[25px] sm:gap-[50px] md:gap-[75px] lg:gap-[100px]">
            <div className="w-full sm:w-1/2 max-w-[400px] flex flex-col items-center sm:items-start gap-4">
              <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-center sm:text-start">
                We are building the TimeCube for mobile. Launching soon. Don’t
                miss out, let us tell you when it’s ready.
              </span>
              <ScrollButton />
            </div>
            <img
              src={"/images/mockup.png"}
              className="w-full sm:w-[40%] lg:w-1/2 max-w-[200px]"
            />
          </div>
        </section>
        <section className="flex flex-col items-center gap-6  md:gap-8 lg:gap-12 xl:gap-16 max-w-[1600px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
          <h1 className="text-center font-InstrumentSans font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[44px] leading-none">
            What people say
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            <div className="max-w-[350px] flex flex-col gap-4 bg-background-muted-static border-foreground-static/80 border p-6 rounded-3xl">
              <div className="flex items-center gap-2.5">
                <FaUserCircle className="opacity-70 sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px]" />
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-semibold font-InstrumentSans">
                  IgotRemarkable
                </h4>
              </div>
              <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                “Studying for an exam right now, this is super helpful for
                keeping track of the time I’ve got left. Really appreciate it!”
              </span>
            </div>
            <div className="max-w-[350px] flex flex-col gap-4 bg-background-muted-static border-foreground-static/80 border p-6 rounded-3xl">
              <div className="flex items-center gap-2.5">
                <FaUserCircle className="opacity-70 sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px]" />
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-semibold font-InstrumentSans">
                  Eugene
                </h4>
              </div>
              <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                “I’ve surprisingly found myself using the time cube”
              </span>
            </div>
            <div className="max-w-[350px] flex flex-col gap-4 bg-background-muted-static border-foreground-static/80 border p-6 rounded-3xl">
              <div className="flex items-center gap-2.5">
                <FaUserCircle className="opacity-70 sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px]" />
                <h4 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] max-w-[800px] font-semibold font-InstrumentSans">
                  TheOwlHypothesis
                </h4>
              </div>
              <span className="font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                “Memento Mori,
                <br /> Nice”
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-6 max-w-[1600px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
          <h1
            className="text-center text-[18px] sm:text-[19px] md:text-[20px] lg:text-[21px] xl:text-[22px] leading-none"
            id="emailInput"
          >
            Get notified when the mobile app is ready
          </h1>
          <EmailWaitlist />
        </section>
      </main>
    </>
  );
};

export default HomePage;
