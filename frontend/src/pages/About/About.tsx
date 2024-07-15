import { Link } from "react-router-dom";
import { useRef } from "react";
import Slider from "react-slick";

export default function About() {
  const myRefOne = useRef<HTMLHeadingElement>(null!);
  const myRefTwo = useRef<HTMLHeadingElement>(null!);
  const myRefThree = useRef<HTMLHeadingElement>(null!);
  const myRefFour = useRef<HTMLHeadingElement>(null!);
  const myRefFive = useRef<HTMLHeadingElement>(null!);
  const myRefSix = useRef<HTMLHeadingElement>(null!);

  function handleScrollToRef(ref: React.MutableRefObject<HTMLHeadingElement>) {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 525,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
    ],
  };

  return (
    <main className='min-h-dvh font-poppins'>
      <section className='bg-primary-800 py-20 lg:py-32'>
        <h1 className='text-4xl text-center text-white md:text-5xl lg:text-7xl'>
          All about MacroMates
        </h1>
      </section>
      <nav
        aria-label='Scroll to refs navigation'
        className='bg-primary-400 sticky top-20 mx-auto lg:grid lg:grid-cols-7'>
        <ul className='slider-container container py-4 px-8 text-gray-700 mx-auto md:w-11/12 md:px-0 lg:col-start-2 lg:col-span-6 lg:max-w-screen-lg'>
          <Slider {...settings}>
            <li className='w-min'>
              <button
                onClick={() => handleScrollToRef(myRefOne)}
                className='focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4 focus:decoration-2 hover:decoration-2'>
                What is MacroMates?
              </button>
            </li>
            <li className='w-min'>
              <button
                onClick={() => handleScrollToRef(myRefTwo)}
                className='focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4 focus:decoration-2 hover:decoration-2'>
                Our Story
              </button>
            </li>
            <li className='w-min'>
              <button
                onClick={() => handleScrollToRef(myRefThree)}
                className='focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4 focus:decoration-2 hover:decoration-2'>
                What We offer
              </button>
            </li>
            <li className='w-min'>
              <button
                onClick={() => handleScrollToRef(myRefFour)}
                className='focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4 focus:decoration-2 hover:decoration-2'>
                Our Vision
              </button>
            </li>
            <li className='w-min'>
              <button
                onClick={() => handleScrollToRef(myRefFive)}
                className='focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4 focus:decoration-2 hover:decoration-2'>
                Join Us
              </button>
            </li>
            <li className='w-min'>
              <button
                onClick={() => handleScrollToRef(myRefSix)}
                className='focus:underline focus:underline-offset-4 hover:underline hover:underline-offset-4 focus:decoration-2 hover:decoration-2'>
                Get in Touch
              </button>
            </li>
          </Slider>
        </ul>
      </nav>
      <section className='px-4 pb-8 my-6 md:max-w-screen-md md:mx-auto'>
        <section className='my-6'>
          <h2
            ref={myRefOne}
            className='text-primary-800 text-3xl mb-4 font-medium scroll-mt-36'>
            What is MacroMates?
          </h2>
          <p>
            Welcome to Macromates, your ultimate hub for discovering, sharing,
            and enjoying nutritious recipes.
          </p>
          <br></br>
          <p>
            Our mission is to build a community where nutrition enthusiasts can
            connect, inspire, and support each other in their journey towards a
            healthier lifestyle.
          </p>
        </section>
        <section className='my-6'>
          <h2
            ref={myRefTwo}
            className='text-primary-800 text-3xl mb-4 font-medium scroll-mt-36'>
            Our Story
          </h2>
          <p>
            Macromates was founded with the vision of creating a space where
            health and nutrition take center stage.
          </p>
          <br></br>
          <p>
            Whether you're a fitness enthusiast, a professional nutrition chef,
            or someone who simply wants to eat healthier, Macromates is here to
            help you achieve your dietary goals.
          </p>
          <br></br>
          <p>
            We believe that nutritious food is the foundation of a healthy life,
            and our platform is dedicated to making healthy eating accessible
            and enjoyable for everyone.
          </p>
        </section>
        <section className='my-6'>
          <h2
            ref={myRefThree}
            className='text-primary-800 text-3xl mb-4 font-medium scroll-mt-36'>
            What We Offer
          </h2>
          <section>
            <h3 className='text-primary-800 text-xl my-4 font-medium'>
              Discover Nutritious Recipes
            </h3>
            <p>
              Explore a wide range of recipes designed to meet various
              nutritional needs and preferences. From high-protein meals for gym
              goers to balanced dishes for everyday health, our search and
              filter features make it easy to find the perfect recipe.
            </p>
          </section>
          <section>
            <h3 className='text-primary-800 text-xl my-4 font-medium'>
              Share Your Healthy Creations
            </h3>
            <p>
              Have a nutritious recipe that you swear by? Or maybe you've just
              crafted a new health-conscious dish that you're excited about?
              Share your recipes with the Macromates community, complete with
              detailed nutritional information, ingredients, and instructions.
            </p>
          </section>
          <section>
            <h3 className='text-primary-800 text-xl my-4 font-medium'>
              Conenct with Like-Minded Individuals
            </h3>
            <p>
              Follow fellow health enthusiasts, leave comments on recipes, and
              exchange tips and advice with a community that shares your passion
              for nutrition. Our platform is built on the principle of
              supporting each other in our health journeys.
            </p>
          </section>
          <section>
            <h3 className='text-primary-800 text-xl my-4 font-medium'>
              Save Your Favourites
            </h3>
            <p>
              Found a recipe that fits perfectly into your meal plan? Save it to
              your favorites for easy access anytime. Macromates ensures that
              your go-to recipes are always at your fingertips.
            </p>
          </section>
        </section>
        <section className='my-6'>
          <h2
            ref={myRefFour}
            className='text-primary-800 text-3xl mb-4 font-medium scroll-mt-36'>
            Our Vision
          </h2>
          <p>
            At Macromates, we envision a community where nutrition and healthy
            eating are celebrated and accessible to all. Our goal is to empower
            individuals to take control of their health through informed dietary
            choices.
          </p>
          <br></br>
          <p>
            We strive to make nutritious cooking a rewarding and enjoyable
            experience, fostering a community that thrives on shared knowledge
            and mutual support.
          </p>
        </section>
        <section className='my-6'>
          <h2
            ref={myRefFive}
            className='text-primary-800 text-3xl mb-4 font-medium scroll-mt-36'>
            Join Us
          </h2>
          <p>
            Ready to take your nutrition to the next level? Join Macromates
            today and become part of a community dedicated to healthy living.
          </p>
          <br></br>
          {/* Sign up now should link to registration page */}
          <p>
            <Link
              to='/'
              className='underline underline-offset-4 text-primary-800 hover:text-primary-400'>
              Sign up
            </Link>{" "}
            now to start sharing your nutritious recipes, discovering new meal
            ideas, and connecting with fellow nutrition enthusiasts.
          </p>
        </section>
        <section className='my-6'>
          <h2
            ref={myRefSix}
            className='text-primary-800 text-3xl mb-4 font-medium scroll-mt-32'>
            Get in Touch
          </h2>
          <p>
            We love hearing from our community! If you have any questions,
            feedback, or just want to connect, please reach out to us at{" "}
            <span className='text-primary-800'>support@macromates.com</span>.
          </p>
          <br></br>
          <p>
            Follow us on social media for the latest recipes, nutrition tips,
            and community highlights.
          </p>
        </section>
        <p>
          <span className='text-primary-800'>Welcome to Macromates</span> –
          where nutrition meets community, and every meal is a step towards a
          healthier you.
        </p>
        <br></br>
        <p className='text-primary-800 font-medium'>
          Stay Healthy and Happy Cooking!
        </p>
      </section>
    </main>
  );
}
