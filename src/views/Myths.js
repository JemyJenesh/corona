import React, { useState, useEffect } from "react";
import { Icon, Accordion, Header, Loader } from "semantic-ui-react";
import axios from "axios";

const Myths = () => {
  const [questions, setQuestions] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onQuestionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (!questions) {
      axios("https://nepalcorona.info/api/v1/myths").then(res => {
        setQuestions(res.data.data);
      });
    }
  }, [questions]);
  return (
    <div>
      <Header as="h2" style={{ margin: "1rem 0 2rem 0" }}>
        Myths and Reality about corona virus
      </Header>
      {questions !== null ? (
        questions.length > 0 ? (
          <Accordion fluid styled style={{ marginTop: "1rem" }}>
            {questions.map((ques, i) => (
              <React.Fragment key={ques._id}>
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={onQuestionClick}
                >
                  <Icon name="dropdown" />
                  {ques.myth === ques.myth_np ? (
                    ques.myth
                  ) : (
                    <>
                      {ques.myth} <br />
                      <p style={{ marginLeft: "1.5rem" }}>{ques.myth_np}</p>
                    </>
                  )}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  {ques.reality === ques.reality_np ? (
                    <p>{ques.reality}</p>
                  ) : (
                    <>
                      <p>{ques.reality}</p>
                      <p>{ques.reality_np}</p>
                    </>
                  )}
                </Accordion.Content>
              </React.Fragment>
            ))}
          </Accordion>
        ) : (
          "No Myths"
        )
      ) : (
        <Loader active />
      )}
    </div>
  );
};

export default Myths;
