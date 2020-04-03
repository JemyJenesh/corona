import React, { useState, useEffect } from "react";
import { Icon, Accordion, Header, Select } from "semantic-ui-react";
import axios from "axios";

const langOptions = [
  { key: "np", value: "np", text: "Nepali" },
  { key: "eng", value: "eng", text: "English" }
];

const Questions = () => {
  const [lang, setLang] = useState(langOptions[1].value);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Header as="h2" style={{ margin: "1rem 0 2rem 0" }}>
          Frequently asked questions
        </Header>
        <Select
          placeholder="Select your Language"
          options={langOptions}
          defaultValue={langOptions[1].value}
          onChange={(e, { value }) => setLang(value)}
        />
      </div>
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
                {lang === "eng" ? ques.question : ques.question_np}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <p>{lang === "eng" ? ques.answer : ques.answer_np}</p>
              </Accordion.Content>
            </React.Fragment>
          ))}
      </Accordion>
    </div>
  );
};

export default Questions;
