import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { navigate } from "@reach/router";
import {
  CameraRealtime,
  Overlay,
  Title,
  Paragraph,
  CancelButton,
  PictureTaken,
  CheckIcon
} from "./styles";
import { cropImage } from "../../helpers";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
const CamPage: React.FC = () => {
  const webcamRef = useRef(null);
  const [stopInterval, setStopInterval] = useState(true);
  const [idCard, setIdCard] = useLocalStorage("id_card", "");
  const [status, setStatus] = useLocalStorage("status", "");

  useEffect(() => {
    if (stopInterval) {
      const interval = setInterval(() => {
        console.log("Take a screenshot");
        capture();
      }, 2000);
      return () => clearInterval(interval);
    }
  });

  const validateIdCard = useCallback(async () => {
    await window
      .fetch("https://front-exercise.z1.digital/evaluations", {
        method: "POST"
      })
      .then(res => res.json())
      .then(response => {
        if (response.summary.outcome === "Approved") {
          setStopInterval(false);
          setStatus("Accepted");
          setTimeout(() => {
            navigate(`/`);
          console.log("to home");
          }, 3000);
          console.log("Accepted");
        } else {
          setStatus("Rejected");
          console.log("Rejected");
        }
      })
      .catch(error => console.log(error));
  }, [setStatus]);

  const capture = React.useCallback(() => {
    if (webcamRef != null) {
      const imageSrc = webcamRef.current.getScreenshot();
      cropImage(imageSrc, (url: any) => {
        setIdCard(url);
      });
      validateIdCard();
    }
  }, [validateIdCard, setIdCard]);

  return (
    <>
      <div className="">
        <div className="">
          <div id="camera" className="Camera">
            <CameraRealtime>
              <Webcam
                height={100 + "%"}
                width={100 + "%"}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            </CameraRealtime>
            <Overlay status={status}>
              {!stopInterval ? (
                <PictureTaken>
                  <CheckIcon /> Picture Taken
                </PictureTaken>
              ) : null}
            </Overlay>

            <Title>Take picture</Title>

            <Paragraph>
              Fit your ID card inside the frame.
              <br /> The picture will be taken automatically.
            </Paragraph>
            <CancelButton to="/" onClick={() => console.log("back")}>
              Cancel
            </CancelButton>
            <canvas id="canvas" style={{ display: "none" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CamPage;
