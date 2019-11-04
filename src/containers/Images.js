import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Images.css";

export default function Notes(props) {
  const file = useRef(null);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("images", `/images/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const image = await loadNote();
        const { caption, imageUrl } = image;

        if (imageUrl) {
          image.imageUrl = await Storage.vault.get(imageUrl);
        }

        setCaption(caption);
        setImage(image);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return caption.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    setIsLoading(true);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmed) return;
    setIsDeleting(true);
  }
  
  return (
    <div className="Images">
      {image && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="caption">
            <FormControl
              value={caption}
              componentClass="textarea"
              onChange={e => setCaption(e.target.value)}
            />
          </FormGroup>
          {image.imageUrl && (
            <FormGroup>
              <ControlLabel>Image...</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={image.imageUrl}
                >
                  {formatFilename(image.imageUrl)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!image.imageUrl && <ControlLabel>Image...</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}