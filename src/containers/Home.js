import React, { useState, useEffect } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import './Home.css';

export default function Home(props) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) return;
      try {
        const images = await loadImages();
        setImages(images);
      } catch(e) {
        alert(e.message);
      }
      setIsLoading(false);
    }
    onLoad(false);
  }, [props.isAuthenticated]);

  function loadImages() {
    return API.get("images", "/images");
  }

  function renderImagesList(images) {
    return [{}].concat(images).map((image, i) =>
      i !== 0 ? (
        <LinkContainer key={image.id} to={`/images/${image.id}`}>
          <ListGroupItem header={image.caption.trim().split("\n")[0]}>
            {"Created: " + new Date(image.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/images/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new image
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Resizer</h1>
        <p>A simple image resizing app</p>
      </div>
    );
  }

  function renderImages() {
    return (
      <div className="images">
        <PageHeader>Your Images</PageHeader>
        <ListGroup>
          {!isLoading && renderImagesList(images)}
        </ListGroup>
      </div>
    );
  }
  return (
    <div className="Home">
      {props.isAuthenticated ? renderImages() : renderLander()}
    </div>
  );
}