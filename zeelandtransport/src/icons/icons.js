import React from "react";

export function MenuIcon({ width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.875 30.625H33.125M6.875 20.625H33.125M6.875 10.625H33.125"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
export function UserIcon({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.6099 14.3454C24.6099 15.5631 24.1262 16.7309 23.2652 17.5919C22.4042 18.4529 21.2364 18.9366 20.0187 18.9366C18.8011 18.9366 17.6333 18.4529 16.7723 17.5919C15.9113 16.7309 15.4276 15.5631 15.4276 14.3454C15.4276 13.1278 15.9113 11.96 16.7723 11.099C17.6333 10.238 18.8011 9.7543 20.0187 9.7543C21.2364 9.7543 22.4042 10.238 23.2652 11.099C24.1262 11.96 24.6099 13.1278 24.6099 14.3454ZM25.5538 19.1753C26.4811 18.1126 27.0828 16.8054 27.2871 15.4099C27.4914 14.0144 27.2896 12.5896 26.706 11.3057C26.1223 10.0218 25.1813 8.93305 23.9955 8.16953C22.8097 7.40601 21.4291 7 20.0187 7C18.6084 7 17.2278 7.40601 16.042 8.16953C14.8562 8.93305 13.9152 10.0218 13.3315 11.3057C12.7478 12.5896 12.5461 14.0144 12.7504 15.4099C12.9547 16.8054 13.5564 18.1126 14.4837 19.1753C12.9125 19.5871 11.5221 20.5079 10.5299 21.7938C9.53776 23.0797 8.99973 24.6582 9 26.2824V29.0371C9 30.0112 9.38697 30.9454 10.0758 31.6342C10.7646 32.323 11.6988 32.71 12.6729 32.71H27.3646C28.3387 32.71 29.2729 32.323 29.9617 31.6342C30.6505 30.9454 31.0375 30.0112 31.0375 29.0371V26.2824C31.0377 24.6582 30.4997 23.0797 29.5075 21.7938C28.5153 20.5079 27.125 19.5871 25.5538 19.1753ZM20.0187 21.6913H16.3458C15.1282 21.6913 13.9604 22.175 13.0994 23.036C12.2384 23.897 11.7547 25.0648 11.7547 26.2824V29.0371C11.7547 29.2806 11.8514 29.5142 12.0236 29.6864C12.1958 29.8586 12.4294 29.9553 12.6729 29.9553H27.3646C27.6081 29.9553 27.8416 29.8586 28.0138 29.6864C28.186 29.5142 28.2828 29.2806 28.2828 29.0371V26.2824C28.2828 25.0648 27.7991 23.897 26.9381 23.036C26.0771 22.175 24.9093 21.6913 23.6916 21.6913H20.0187Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LocationMarker() {
  return (
    <div className="icon-container">
      <svg
        width="inherit"
        height="inherit"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0002 19.1667C18.8951 19.1667 17.8353 18.7277 17.0539 17.9463C16.2725 17.1649 15.8335 16.1051 15.8335 15C15.8335 13.8949 16.2725 12.8351 17.0539 12.0537C17.8353 11.2723 18.8951 10.8333 20.0002 10.8333C21.1052 10.8333 22.165 11.2723 22.9464 12.0537C23.7278 12.8351 24.1668 13.8949 24.1668 15C24.1668 15.5472 24.0591 16.089 23.8497 16.5945C23.6403 17.1 23.3334 17.5594 22.9464 17.9463C22.5595 18.3332 22.1002 18.6401 21.5947 18.8495C21.0892 19.0589 20.5473 19.1667 20.0002 19.1667ZM20.0002 3.33333C16.906 3.33333 13.9385 4.56249 11.7506 6.75042C9.56266 8.93834 8.3335 11.9058 8.3335 15C8.3335 23.75 20.0002 36.6667 20.0002 36.6667C20.0002 36.6667 31.6668 23.75 31.6668 15C31.6668 11.9058 30.4377 8.93834 28.2497 6.75042C26.0618 4.56249 23.0944 3.33333 20.0002 3.33333Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
