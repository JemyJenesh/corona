import React, { useState, useEffect } from "react";
import { Icon, Accordion, Header, Select } from "semantic-ui-react";
import axios from "axios";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onQuestionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (questions.length === 0) {
      axios("https://nepalcorona.info/api/v1/faqs").then(res => {
        setQuestions(res.data.data);
      });
    }
  }, [questions]);
  return (
    <div>
      <Header as="h2" style={{ margin: "1rem 0 2rem 0" }}>
        Frequently asked questions
      </Header>
      <Select placeholder="Select your Language" />
      <Accordion fluid styled style={{ marginTop: "1rem" }}>
        {questions.length > 0 &&
          questions.map((ques, i) => (
            <React.Fragment key={ques._id}>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={onQuestionClick}
              >
                <Icon name="dropdown" />
                {ques.question}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <p>{ques.answer}</p>
              </Accordion.Content>
            </React.Fragment>
          ))}
      </Accordion>
    </div>
  );
};

export default Questions;
