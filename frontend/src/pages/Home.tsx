import Header from "../components/Header";

interface objType {
  heading: string;
  desc: string;
}

const Home: React.FC<{}> = () => {
  const cardContent: objType[] = [
    {
      heading: "Fast & Reliable",
      desc: "Shorten links instantly with 99.9% uptime.",
    },
    {
      heading: "Advanced Analytics",
      desc: "Track clicks, locations, and devices in real-time.",
    },
    {
      heading: "Custom URLs",
      desc: "Create branded, memorable short links.",
    },
    {
      heading: "Secure Links",
      desc: "Protect your links with passwords and malware scanning.",
    },
    {
      heading: "Generate QR",
      desc: "Generate QR code for your website and businesses.",
    },
  ];

  return (
    <>
      <div className="main">
        <section>
          <Header />
        </section>
        <section className="heading flex flex-col items-center">
          <div className="flex flex-col items-center mt-10 justify-items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Shorten Links,
              </span>{" "}
              Track Clicks, and Grow Your Audience
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 mb-6 text-center">
              Turn lengthy URLs into concise, shareable links in just a few
              clicks. Track clicks, monitor traffic, and optimize your campaigns
              effortlessly. From shortening to analytics, we’ve got your links
              covered.
            </p>
          </div>

          <div className="lg:w-3xl w-full pl-5 pr-5 mt-15">
            <form>
              <label
                htmlFor="short"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Short
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="short"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter URL to short"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Short
                </button>
              </div>
            </form>
            <div className="p-5">
              <h5 className="text-gray-500 font-extrabold mb-2">
                Shorten URL:
              </h5>
              <div className="flex">
                <a
                  href="https://facebook.com/abcdef"
                  className="font-bold text-blue-500 bg-gray-300 p-2 rounded-l-lg w-60 overflow-hidden"
                >
                  https://facebook.com/abcdefbvjkdhsbvjksb
                </a>
                <button
                  type="submit"
                  className="text-white  bg-gray-700 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-normal rounded-r-lg text-sm  dark:bg-gray-600 dark:hover:bg-gray-700 pl-2 pr-2 dark:focus:ring-blue-300"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center mt-20">
          <h1 className="text-4xl font-bold mb-10">Why Choose Us?</h1>
          <div className="container m-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-4 justify-center">
            {...cardContent?.map((content) => (
              <div className="mb-4 ">
                <a
                  href="#"
                  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                    {content.heading}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                    {content.desc}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;
