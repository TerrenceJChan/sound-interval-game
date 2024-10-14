import DescriptionTooltip from "@/components/DescriptionTooltip";

const Shop = () => {
  return (
    <div className="flex w-full flex-grow flex-col">
      <h1 className="p-8 text-center text-3xl font-bold lg:text-5xl">Shop</h1>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-wrap justify-center gap-8">
          {/* Difficulty */}
          <div className="flex flex-col gap-4 rounded-xl border-4 border-border bg-border/15 p-4 transition-all hover:bg-border/50">
            <h2 className="px-1 text-3xl font-semibold">Difficulty</h2>
            <div className="flex flex-col gap-1">
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      For players who have warmed up with the starting
                      difficulty.
                    </p>
                    <p className="font-medium">
                      Allows intervals up to and including perfect fifth (7
                      semitones).
                    </p>
                  </div>
                }
              >
                <div className="flex flex-row justify-between gap-8 rounded-xl p-2 transition-all hover:bg-yellow-100/10">
                  <div className="underline decoration-dotted">Beginner</div>
                  <div>50 Points</div>
                </div>
              </DescriptionTooltip>
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Standard training that will expose additional intervals.
                    </p>
                    <p className="font-medium">
                      Allows intervals up to and including major sixths (10
                      semitones).
                    </p>
                  </div>
                }
              >
                <div className="flex flex-row justify-between gap-8 rounded-xl p-2 transition-all hover:bg-yellow-100/10">
                  <div className="underline decoration-dotted">
                    Intermediate
                  </div>
                  <div>200 Points</div>
                </div>
              </DescriptionTooltip>
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Advanced training that will expose all standard intervals.
                    </p>
                    <p className="font-medium">
                      Allows intervals up to and including perfect eighths (13
                      semitones).
                    </p>
                  </div>
                }
              >
                <div className="flex flex-row justify-between gap-8 rounded-xl p-2 transition-all hover:bg-yellow-100/10">
                  <div className="underline decoration-dotted">Advanced</div>
                  <div>500 Points</div>
                </div>
              </DescriptionTooltip>
            </div>
          </div>

          {/* Instrument */}
          <div className="flex flex-col gap-4 rounded-xl border-4 border-border bg-border/15 p-4 transition-all hover:bg-border/50">
            <h2 className="px-2 text-3xl font-semibold">Instrument</h2>
            <div className="flex flex-col gap-1">
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Adds the option to listen to a different instrument for
                      interval testing.
                    </p>
                    <p className="font-medium">
                      Unlocks the flute during game setup.
                    </p>
                  </div>
                }
              >
                <div className="flex flex-row justify-between gap-8 rounded-xl p-2 transition-all hover:bg-yellow-100/10">
                  <div className="underline decoration-dotted">Flute</div>
                  <div>500 Points</div>
                </div>
              </DescriptionTooltip>
              <DescriptionTooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p>
                      Adds the option to listen to a different instrument for
                      interval testing.
                    </p>
                    <p className="font-medium">
                      Unlocks the xylophone during game setup.
                    </p>
                  </div>
                }
              >
                <div className="flex flex-row justify-between gap-8 rounded-xl p-2 transition-all hover:bg-yellow-100/10">
                  <div className="underline decoration-dotted">Xylophone</div>
                  <div>500 Points</div>
                </div>
              </DescriptionTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
