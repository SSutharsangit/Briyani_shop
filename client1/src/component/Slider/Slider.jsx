import React, { useEffect, useState } from 'react'

function Slider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (index) => {
      setActiveIndex(index);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
          // Increment activeIndex to move to the next slide
          handleSlideChange((activeIndex + 1) % 3);
        }, 3000); // Change the duration (in milliseconds) to control the auto-play speed
    
        // Clear the interval when the component unmounts or activeIndex changes
        return () => clearInterval(intervalId);
      }, [activeIndex]);
  return (
    <div >
         <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >
      <div className="carousel-indicators">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSlideChange(index)}
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === activeIndex ? 'active' : ''}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
          <img src="https://media.istockphoto.com/id/1496057459/photo/veg-briyani-with-salad-chutney-raita-and-sauce-served-in-dish-isolated-on-banana-leaf-top.jpg?s=1024x1024&w=is&k=20&c=zbPFwBBOoemk5J7BfgL-0ZF0ca1EE7tmqwOAETjO8dM=" className="d-block" style={{height:"100vh",width:"100vw","object-fit": "cover"}}alt="Slide 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>

        <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
          <img src="https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block"  style={{height:"100vh",width:"100vw","object-fit": "cover"}} alt="Slide 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>

        <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
          <img src="https://media.istockphoto.com/id/1496321950/photo/tandoori-chicken-biryani-rice-pulao-pepper-mutton-dry-mutton-rogan-josh-chicken-karahi-korma.jpg?s=1024x1024&w=is&k=20&c=qvvC4qMWutHeRBNS8nwiNfNLQsSB0K1mNOXt8FVxZE4=" className="d-block" alt="Slide 3" style={{height:"100vh", width:"100vw","object-fit": "cover"}}/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={() => handleSlideChange((activeIndex - 1 + 3) % 3)}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={() => handleSlideChange((activeIndex + 1) % 3)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  )
}

export default Slider