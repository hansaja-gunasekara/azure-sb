import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import movie3 from "../assets/movie3.jpg";
import EventPopup from "./EventPopup";
import useMovies from "../hooks/useMovies";
import useGameQueryStore from "../store";

const SliderContainer = styled(Box)({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  cursor: "grab",
});

const SliderTrack = styled(Box)({
  display: "flex",
  transition: "transform 0.5s ease",
  height: "100%",
});

const Card = styled(Box)({
  flex: "0 0 auto",
  height: "100%",
  aspectRatio: "2 / 3",
  margin: "0 10px",
  borderRadius: "8px",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const NewCardSlider = () => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const { data: cards } = useMovies();

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    let animationId;
    let startTime;

    const animate = (timestamp) => {
      if (!isScrolling) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) * 0.05;

        if (track) {
          track.style.transform = `translateX(-${progress}px)`;

          if (progress >= track.offsetWidth / 2) {
            startTime = timestamp;
            track.appendChild(track.firstElementChild.cloneNode(true));
            track.removeChild(track.firstElementChild);
            track.style.transform = "translateX(0)";
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isScrolling]);

  const handleMouseDown = (e) => {
    setIsScrolling(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = (e) => {
    if (Math.abs(e.pageX - (startX + sliderRef.current.offsetLeft)) < 5) {
      // If movement is less than 5px, consider it a click
      const clickedCard = e.target.closest(".card");
      if (clickedCard) {
        const cardId = parseInt(clickedCard.dataset.cardId);
        const card = cards.find((c) => c.id === cardId);
        if (card) {
          handleCardClick(card);
        }
      }
    }
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const SetSelectedCard = useGameQueryStore((s) => s.SetSelectedCard);

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    SetSelectedCard(card);
    setSelectedCard(card);
    setOpenPopup(true);
  };

  return (
    <>
      <SliderContainer
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <SliderTrack ref={trackRef}>
          {cards?.map((card) => (
            <Card key={card._id} className="card" data-card-id={card.id}>
              <CardImage
                onClick={() => handleCardClick(card)}
                src={card.imageUrl}
                alt={`Card ${card.id}`}
              />
            </Card>
          ))}
        </SliderTrack>
      </SliderContainer>
      <EventPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        event={selectedCard}
      />
    </>
  );
};

export default NewCardSlider;
