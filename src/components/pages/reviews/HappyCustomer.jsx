import React, { useState, useRef, useEffect } from "react";
import fiveStar from "../../../images/fivestar.svg";
import good from "../../../images/good.svg";

const reviews = [
  {
    name: "Sarah M.",
    image: fiveStar,
    goodSign: good,
    text: `I'm blown away by the quality and style of the clothes I received from Shop.co.`,
  },
  {
    name: "John D.",
    image: fiveStar,
    goodSign: good,
    text: `Fast shipping and amazing service! Clothes are stylish and comfortable.`,
  },
  {
    name: "Lara K.",
    image: fiveStar,
    goodSign: good,
    text: `I’ve recommended Shop.co to all my friends. Quality is unmatched.`,
  },
  {
    name: "Mike B.",
    image: fiveStar,
    goodSign: good,
    text: `Affordable prices and great customer support.`,
  },
  {
    name: "Nina P.",
    image: fiveStar,
    goodSign: good,
    text: `Every time I order from Shop.co, it’s a hit. I love the fabric!`,
  },
  {
    name: "Emma R.",
    image: fiveStar,
    goodSign: good,
    text: `These clothes make me feel confident and stylish. Highly recommended.`,
  },
  {
    name: "Alex T.",
    image: fiveStar,
    goodSign: good,
    text: `Great fit and fantastic colors. Will buy again!`,
  },
  {
    name: "Olivia W.",
    image: fiveStar,
    goodSign: good,
    text: `Customer service was super helpful with my questions.`,
  },
  {
    name: "James L.",
    image: fiveStar,
    goodSign: good,
    text: `The quality exceeded my expectations. Very happy!`,
  },
  {
    name: "Sophia G.",
    image: fiveStar,
    goodSign: good,
    text: `Stylish clothes that last. Highly recommended.`,
  },
];

const HappyCustomer = () => {
  const scrollContainerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [startIndex, setStartIndex] = useState(0);

  const updateVisibleCount = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(1);
    } else if (width < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxStartIndex = reviews.length - visibleCount;

  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const reviewWidth = container.offsetWidth / visibleCount;
    container.scrollTo({
      left: reviewWidth * index,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      const next = prev < maxStartIndex ? prev + 1 : 0;
      scrollToIndex(next);
      return next;
    });
  };

  const handlePrev = () => {
    setStartIndex((prev) => {
      const next = prev > 0 ? prev - 1 : maxStartIndex;
      scrollToIndex(next);
      return next;
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const reviewWidth = container.offsetWidth / visibleCount;
      const index = Math.round(scrollLeft / reviewWidth);
      setStartIndex(index);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [visibleCount]);

  return (
      <div className="py-10 px-5 lg:px-[120px] max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">OUR HAPPY CUSTOMERS</h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="text-white bg-gray-800 hover:bg-black transition px-4 py-2 rounded"
          >
            &larr;
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-gray-800 hover:bg-black transition px-4 py-2 rounded"
          >
            &rarr;
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${(reviews.length / visibleCount) * 100}%`,
          }}
        >
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-3"
              style={{
                width: `${100 / reviews.length}%`,
                scrollSnapAlign: "start",
              }}
            >
              <div className="border p-4 rounded shadow bg-white h-full text-center">
                <img
                  src={review.image}
                  alt="Five Star Rating"
                  className="w-12 h-12 mb-2 mx-auto"
                />
                <h4 className="font-semibold flex justify-center items-center gap-2 text-lg">
                  {review.name}
                  <img
                    src={review.goodSign}
                    alt="good sign"
                    className="w-5 h-5"
                  />
                </h4>
                <p className="mt-2 text-gray-700">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HappyCustomer;
