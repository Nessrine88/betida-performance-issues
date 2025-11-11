interface LinkIconSVGProps {
  className?: string;
  strokeWidth?: number; // optional, default 4
  strokeColor?: string; // optional, default white
  width?: number; // optional width in px
  height?: number; // optional height in px
}

function LinkIconSVG({
  className = "",
  strokeWidth = 4,
  strokeColor = "white",
  width = 49,
  height = 36,
}: LinkIconSVGProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 49 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.9174 25.6L28.7774 22.736C31.0546 20.4572 32.3338 17.3675 32.3338 14.146C32.3338 10.9244 31.0546 7.83467 28.7774 5.55596C27.6505 4.42832 26.3125 3.53379 24.8398 2.92347C23.3671 2.31316 21.7885 1.99902 20.1944 1.99902C18.6002 1.99902 17.0217 2.31316 15.5489 2.92347C14.0762 3.53379 12.7382 4.42832 11.6114 5.55596L5.88936 11.286C4.23477 12.9447 3.09497 15.0464 2.60721 17.338C2.11945 19.6295 2.30452 22.0132 3.14014 24.202C3.97577 26.3909 5.42631 28.2914 7.3171 29.6749C9.20789 31.0584 11.4583 31.8658 13.7974 32"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        opacity="0.5"
        d="M22.7494 10.4L19.8894 13.264C17.6121 15.5427 16.3329 18.6324 16.3329 21.854C16.3329 25.0756 17.6121 28.1653 19.8894 30.444C21.0162 31.5716 22.3542 32.4662 23.8269 33.0765C25.2997 33.6868 26.8782 34.0009 28.4724 34.0009C30.0665 34.0009 31.6451 33.6868 33.1178 33.0765C34.5905 32.4662 35.9285 31.5716 37.0554 30.444L42.7774 24.716C44.4326 23.0573 45.5729 20.9555 46.0611 18.6636C46.5492 16.3717 46.3643 13.9876 45.5286 11.7984C44.6929 9.60918 43.2421 7.70829 41.3509 6.32469C39.4597 4.94108 37.2088 4.13377 34.8694 4"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default LinkIconSVG;
