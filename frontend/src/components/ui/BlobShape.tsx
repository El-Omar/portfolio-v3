const BlobShape = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none h-screen">
      <div className="relative h-screen w-full">
        <div className="absolute xl:-top-[400px] xl:-right-[300px] xl:w-[1000px] xl:h-[1000px] lg:-top-[300px] lg:-right-[200px] lg:w-[700px] lg:h-[700px] -top-[150px] -right-[150px] w-[500px] h-[500px]">
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[50deg]"
          >
            <defs>
              <linearGradient
                id="blob-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#f0574a", stopOpacity: 0.6 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#ececec", stopOpacity: 0.3 }}
                />
              </linearGradient>
            </defs>

            <path
              d="M226.5 37.4c36.6 12.3 71.5 33.5 94.2 64.5 22.7 31 33.2 71.7 24.8 107.1-8.3 35.4-35.4 65.5-68.3 87.2-32.9 21.7-71.5 35-109.8 31.6-38.3-3.3-76.3-23.3-98.9-54.9-22.7-31.6-30-74.8-19.8-112.1 10.2-37.2 37.8-68.5 73.2-85.5 35.4-17 78.6-19.7 104.6-37.9z"
              fill="url(#blob-gradient)"
            >
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="M226.5 37.4c36.6 12.3 71.5 33.5 94.2 64.5 22.7 31 33.2 71.7 24.8 107.1-8.3 35.4-35.4 65.5-68.3 87.2-32.9 21.7-71.5 35-109.8 31.6-38.3-3.3-76.3-23.3-98.9-54.9-22.7-31.6-30-74.8-19.8-112.1 10.2-37.2 37.8-68.5 73.2-85.5 35.4-17 78.6-19.7 104.6-37.9z;
              M250.5 42.4c30.6 22.3 61.5 43.5 74.2 74.5 12.7 31 7.2 71.7-8.2 107.1-15.3 35.4-40.4 65.5-73.3 77.2-32.9 11.7-73.5 5-109.8 1.6-36.3-3.3-68.3-3.3-86.9-24.9-18.7-21.6-24-64.8-13.8-102.1 10.2-37.2 35.8-68.5 71.2-85.5 35.4-17 80.6-19.7 146.6-47.9z;
              M226.5 37.4c36.6 12.3 71.5 33.5 94.2 64.5 22.7 31 33.2 71.7 24.8 107.1-8.3 35.4-35.4 65.5-68.3 87.2-32.9 21.7-71.5 35-109.8 31.6-38.3-3.3-76.3-23.3-98.9-54.9-22.7-31.6-30-74.8-19.8-112.1 10.2-37.2 37.8-68.5 73.2-85.5 35.4-17 78.6-19.7 104.6-37.9z"
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlobShape;
