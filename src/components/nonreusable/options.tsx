"use client";

import { durationOptions, formatTypes } from "@/lib/providers";
import { Modal } from "../reusable/modal";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  getLabel,
  isOptionDisabled,
  useDispatchContext,
} from "@/lib/functions";
import clsx from "clsx";
import { format } from "date-fns";
import { SettingsModal } from "./settingsModal";
import DatePicker from "../reusable/datepicker";
import { Input } from "../ui/input";
import { useRef } from "react";
import React from "react";
import { TimeCubeDataType } from "@/lib/types";

const Options = ({ timeCube }: { timeCube: TimeCubeDataType }) => {
  const dispatch = useDispatchContext();
  const windowWidth = window.innerWidth;
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);

  return (
    <>
      {windowWidth >= 1000 && (
        <div className="flex gap-3 lg:gap-6 justify-center">
          <div className="flex flex-col gap-1.5 items-center">
            <Modal label={getLabel(timeCube.cubeDuration)}>
              <ToggleGroup
                type="single"
                defaultValue={timeCube.cubeDuration.toString()}
                onValueChange={(val) => {
                  if (!val) return;
                  if (val) {
                    // dispatch({
                    //   type: "SET_FIELD",
                    //   field: "cubeDuration",
                    //   value: Number(val),
                    // });
                    dispatch({
                      type: "UPDATE",
                      payload: { id: timeCube.id, cubeDuration: Number(val) },
                    });
                  }
                }}
                className="flex flex-col items-center w-full gap-2"
              >
                {durationOptions.map((durationOption) => (
                  <ToggleGroupItem
                    value={durationOption.value.toString()}
                    onClick={(e) => {
                      if (
                        timeCube.cubeDuration.toString() ===
                        durationOption.value.toString()
                      )
                        e.preventDefault();
                    }}
                    className={clsx(
                      "data-[state=on]:bg-foreground/60 data-[state=on]:text-text-color",
                      "w-full py-2 hover:bg-foreground/20 hover:text-inherit"
                    )}
                    key={durationOption.value}
                    disabled={isOptionDisabled(timeCube, durationOption.value)}
                  >
                    {durationOption.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Modal>
            <span className="text-[12px] text-text-color/80 font-medium">
              cube duration
            </span>
          </div>
          <div className="flex flex-col gap-1.5 items-center">
            <Modal label={timeCube.format}>
              <ToggleGroup
                type="single"
                defaultValue={timeCube.format}
                onValueChange={(val) => {
                  if (!val) return;
                  if (val) {
                    // dispatch({
                    //   type: "SET_FIELD",
                    //   field: "format",
                    //   value: val,
                    // });
                    dispatch({
                      type: "UPDATE",
                      payload: { id: timeCube.id, format: val },
                    });
                  }
                }}
                className="flex flex-col items-center w-full gap-2"
              >
                {formatTypes.map((formatType) => (
                  <ToggleGroupItem
                    value={formatType}
                    key={formatType}
                    onClick={(e) => {
                      if (timeCube.format === formatType) e.preventDefault();
                    }}
                    className={clsx(
                      "data-[state=on]:bg-foreground/60 data-[state=on]:text-text-color",
                      "w-full py-2 hover:bg-foreground/20 hover:text-inherit"
                    )}
                  >
                    {formatType}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Modal>
            <span className="text-[12px] text-text-color/80 font-medium">
              format
            </span>
          </div>

          {timeCube.format === "life" && (
            <div className="flex gap-3 lg:gap-6 flex-wrap">
              <div className="flex flex-col gap-1.5 items-center">
                <Modal label={timeCube.passedYears} inputRef={inputRef1}>
                  <div className="w-full flex flex-col gap-4">
                    <span className="text-[14px]">Age(Years):</span>
                    <Input
                      ref={inputRef1}
                      type="text"
                      value={timeCube.passedYears}
                      onChange={(e) => {
                        if (
                          typeof Number(e.target.value) === "number" &&
                          Number(e.target.value) >= 0
                        ) {
                          dispatch({
                            type: "UPDATE",
                            payload: {
                              id: timeCube.id,
                              passedYears: Number(e.target.value),
                            },
                          });
                        }
                      }}
                      className="py-2 px-4 border-foreground border rounded-md w-full"
                    />
                  </div>
                </Modal>
                <span className="text-[12px] text-text-color/80 font-medium">
                  age (years)
                </span>
              </div>

              <div className="flex flex-col gap-1.5 items-center">
                <Modal label={timeCube.totalYears} inputRef={inputRef2}>
                  <div className="w-full flex flex-col gap-4">
                    <span className="text-[14px]">Lifespan(Years):</span>
                    <Input
                      ref={inputRef2}
                      type="text"
                      value={timeCube.totalYears}
                      onChange={(e) => {
                        if (
                          typeof Number(e.target.value) === "number" &&
                          Number(e.target.value) >= 0
                        ) {
                          // dispatch({
                          //   type: "SET_FIELD",
                          //   field: "totalYears",
                          //   value: Number(e.target.value),
                          // });
                          dispatch({
                            type: "UPDATE",
                            payload: {
                              id: timeCube.id,
                              totalYears: Number(e.target.value),
                            },
                          });
                        }
                      }}
                      className="py-2 px-4 border-foreground border rounded-md w-full"
                    />
                  </div>
                </Modal>
                <span className="text-[12px] text-text-color/80 font-medium">
                  lifespan (years)
                </span>
              </div>
            </div>
          )}
          {timeCube.format === "custom" && (
            <div className="flex gap-3 lg:gap-6">
              <div className="flex flex-col gap-1.5 items-center">
                <Modal label={format(timeCube.initialCustomDate, "PPP")}>
                  <DatePicker
                    timeCubeItem={timeCube}
                    date={timeCube.initialCustomDate}
                    dispatch={dispatch}
                    field="initialCustomDate"
                  />
                </Modal>
                <span className="text-[12px] text-text-color/80 font-medium">
                  start date
                </span>
              </div>

              <div className="flex flex-col gap-1.5 items-center">
                <Modal label={format(timeCube.endCustomDate, "PPP")}>
                  <DatePicker
                    timeCubeItem={timeCube}
                    date={timeCube.endCustomDate}
                    dispatch={dispatch}
                    field="endCustomDate"
                  />
                </Modal>
                <span className="text-[12px] text-text-color/80 font-medium">
                  end date
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {windowWidth < 1000 && (
        <div className="flex flex-col gap-3 items-center">
          <SettingsModal label={"Cube settings"}>
            <div className="w-full flex flex-col gap-2 items-start">
              <span className="text-[12px] text-text-color/80 font-medium">
                cube duration
              </span>
              <Modal label={getLabel(timeCube.cubeDuration)} full={true}>
                <ToggleGroup
                  type="single"
                  defaultValue={timeCube.cubeDuration.toString()}
                  onValueChange={(val) => {
                    if (!val) return;

                    if (val) {
                      dispatch({
                        type: "UPDATE",
                        payload: { id: timeCube.id, cubeDuration: Number(val) },
                      });
                    }
                  }}
                  className="flex flex-col items-center w-full gap-2"
                >
                  {durationOptions.map((durationOption) => (
                    <ToggleGroupItem
                      value={durationOption.value.toString()}
                      onClick={(e) => {
                        if (
                          timeCube.cubeDuration.toString() ===
                          durationOption.value.toString()
                        )
                          e.preventDefault();
                      }}
                      className={clsx(
                        "data-[state=on]:bg-foreground/60 data-[state=on]:text-text-color",
                        "w-full py-2 hover:bg-foreground/20 hover:text-inherit"
                      )}
                      key={durationOption.value}
                      disabled={isOptionDisabled(
                        timeCube,
                        durationOption.value
                      )}
                    >
                      {durationOption.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Modal>
            </div>

            <div className="w-full flex flex-col gap-2 items-start">
              <span className="text-[12px] text-text-color/80 font-medium">
                format
              </span>
              <Modal label={timeCube.format} full={true}>
                <ToggleGroup
                  type="single"
                  defaultValue={timeCube.format}
                  onValueChange={(val) => {
                    if (!val) return;

                    if (val) {
                      // dispatch({
                      //   type: "SET_FIELD",
                      //   field: "format",
                      //   value: val,
                      // });
                      dispatch({
                        type: "UPDATE",
                        payload: { id: timeCube.id, format: val },
                      });
                    }
                  }}
                  className="flex flex-col items-center w-full gap-2"
                >
                  {formatTypes.map((formatType) => (
                    <ToggleGroupItem
                      value={formatType}
                      key={formatType}
                      onClick={(e) => {
                        if (timeCube.format === formatType) e.preventDefault();
                      }}
                      className={clsx(
                        "data-[state=on]:bg-foreground/60 data-[state=on]:text-text-color",
                        "w-full py-2 hover:bg-foreground/20 hover:text-inherit"
                      )}
                    >
                      {formatType}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Modal>
            </div>
            {timeCube.format === "life" && (
              <div className="flex flex-col gap-3 justify-center w-full">
                <div className="w-full flex flex-col gap-2 items-start">
                  <span className="text-[12px] text-text-color/80 font-medium">
                    age (years)
                  </span>
                  <Modal
                    label={timeCube.passedYears}
                    inputRef={inputRef3}
                    full={true}
                  >
                    <div className="w-full flex flex-col gap-4">
                      <span className="text-[14px]">Age(Years):</span>
                      <Input
                        ref={inputRef3}
                        type="text"
                        value={timeCube.passedYears}
                        onChange={(e) => {
                          if (
                            typeof Number(e.target.value) === "number" &&
                            Number(e.target.value) >= 0
                          ) {
                            dispatch({
                              type: "UPDATE",
                              payload: {
                                id: timeCube.id,
                                passedYears: Number(e.target.value),
                              },
                            });
                          }
                        }}
                        className="py-2 px-4 border-foreground border rounded-md w-full"
                      />
                    </div>
                  </Modal>
                </div>
                <div className="w-full flex flex-col gap-2 items-start">
                  <span className="text-[12px] text-text-color/80 font-medium">
                    lifespan (years)
                  </span>
                  <Modal
                    label={timeCube.totalYears}
                    inputRef={inputRef4}
                    full={true}
                  >
                    <div className="w-full flex flex-col gap-4">
                      <span className="text-[14px]">Lifespan(Years):</span>
                      <Input
                        ref={inputRef4}
                        type="text"
                        value={timeCube.totalYears}
                        onChange={(e) => {
                          if (
                            typeof Number(e.target.value) === "number" &&
                            Number(e.target.value) >= 0
                          ) {
                            // dispatch({
                            //   type: "SET_FIELD",
                            //   field: "totalYears",
                            //   value: Number(e.target.value),
                            // });
                            dispatch({
                              type: "UPDATE",
                              payload: {
                                id: timeCube.id,
                                totalYears: Number(e.target.value),
                              },
                            });
                          }
                        }}
                        className="py-2 px-4 border-foreground border rounded-md w-full"
                      />
                    </div>
                  </Modal>
                </div>
              </div>
            )}
            {timeCube.format === "custom" && (
              <div className="flex flex-col gap-3 justify-center w-full">
                <div className="w-full flex flex-col gap-2 items-start">
                  <span className="text-[12px] text-text-color/80 font-medium">
                    start date
                  </span>
                  <Modal
                    label={format(timeCube.initialCustomDate, "PPP")}
                    full={true}
                  >
                    <DatePicker
                      timeCubeItem={timeCube}
                      date={timeCube.initialCustomDate}
                      dispatch={dispatch}
                      field="initialCustomDate"
                    />
                  </Modal>
                </div>
                <div className="w-full flex flex-col gap-2 items-start">
                  <span className="text-[12px] text-text-color/80 font-medium">
                    end date
                  </span>
                  <Modal
                    label={format(timeCube.endCustomDate, "PPP")}
                    full={true}
                  >
                    <DatePicker
                      timeCubeItem={timeCube}
                      date={timeCube.endCustomDate}
                      dispatch={dispatch}
                      field="endCustomDate"
                    />
                  </Modal>
                </div>
              </div>
            )}
          </SettingsModal>
        </div>
      )}
    </>
  );
};

export default React.memo(Options);
