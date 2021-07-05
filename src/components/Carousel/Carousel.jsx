import React, { useEffect, useState } from 'react';
import './Carousel.scss';

const classesList = [
  'start-card',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'last-card'
]

export const Carousel = ({ users, callBack }) => {

  const [cardsCoords, setCardCoords] = useState(classesList);
  const [authorsList, setAuthors] = useState(users)
  const [authorId, setAuthorId] = useState(null)

  return (

    <div className="box">
      <a
        className="btn prev-btn"
        onClick={() => {
          // setCardCoords(coords => {
          //   const lastList = coords.pop()
          //   coords.unshift(lastList)
          //   return [...coords]
          // })

          setAuthors(() => {
            const firstAuth = authorsList.shift()
            return [...authorsList, firstAuth]
          })
        }}
      />

      <a
        className="btn next-btn"
        onClick={() => {
          const firstList = cardsCoords.shift()
          cardsCoords.push(firstList)
          setCardCoords([...cardsCoords])

          setAuthors(auth => {
            const lastAuth = auth.pop()

            return [lastAuth, ...auth]
          })
        }}
      />
      <ul className="autorsList">

        {
          authorsList.slice(0, 7).map((auth, index) => {
            return <li
            className={"card " + cardsCoords[index]}
          >
            <img
              className="author-image"
              src={auth.image}
              alt="author-image"
            />
            <span className="name">
              {auth.name}
            </span>
          </li>
  

          })

        }

{/* 

        <li
          className={"card " + cardsCoords[0].class}
        >
          <img
            className="author-image"
            src={authorsList[cardsCoords[0].index].image}
            alt="author-image"
          />
          <span className="name">
            {authorsList[cardsCoords[0].index].name}
          </span>
        </li>



        <li
          className={"card " + cardsCoords[1].class}
        >
          <img
            className="author-image"
            src={authorsList[cardsCoords[1].index].image}
            alt="author-image"
          />
          <span className="name">
            {authorsList[cardsCoords[1].index].name}
          </span>
        </li>

        <li
          className={"card " + cardsCoords[2].class}
        >
          <img
            className="author-image"
            src={authorsList[cardsCoords[2].index].image}
            alt="author-image"
          />
          <span className="name">
            {authorsList[cardsCoords[2].index].name}
          </span>
        </li>

        <li
          className={"card " + cardsCoords[3].class}
        >
          <img
            className="author-image"
            src={authorsList[cardsCoords[3].index].image}
            alt="author-image"
          />
          <span className="name">
            {authorsList[cardsCoords[3].index].name}
          </span>
        </li>


        <li
          className={"card " + cardsCoords[4].class}
        >
          <img
            className="author-image"
            src={authorsList[cardsCoords[4].index].image}
            alt="author-image"
          />
          <span className="name">
            {authorsList[cardsCoords[4].index].name}
          </span>
        </li>

        <li
          className={"card " + cardsCoords[5].class}
        >
          <img
            className="author-image"
            src={authorsList[cardsCoords[5].index].image}
            alt="author-image"
          />
          <span className="name">
            {authorsList[cardsCoords[5].index].name}
          </span>
        </li>

        <li
          className={"card " + cardsCoords[6].class}
        >
          <img
            className="author-image"
            src={`${authorsList[cardsCoords[6].index].image}`}
            alt="author-image"
          />
          <span className="name">
            {`${authorsList[cardsCoords[6].index].name}`}
          </span>
        </li>
       */}
      </ul>
    </div>
  )
}
