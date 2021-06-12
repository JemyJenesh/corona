import React, { useState, useEffect, useContext } from "react";
import { Icon, Accordion, Header, Select, Loader } from "semantic-ui-react";
import { store } from "../store/contexts/store";

const langOptions = [
	{ key: "np", value: "np", text: "Nepali" },
	{ key: "eng", value: "eng", text: "English" },
];

const Questions = () => {
	const { loadQuestions, questions, questionsLoaded } = useContext(store);

	const [lang, setLang] = useState(langOptions[1].value);
	const [activeIndex, setActiveIndex] = useState(0);

	const onQuestionClick = (e, titleProps) => {
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;
		setActiveIndex(newIndex);
	};

	useEffect(() => {
		document.title = "Frequently asked questions";
		loadQuestions();
	}, []);

	return (
		<div>
			<div
				className="questions-header"
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
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
			{!questionsLoaded ? (
				<Loader active />
			) : questions.length > 0 ? (
				<Accordion fluid styled style={{ marginTop: "1rem" }}>
					{questions.map((ques, i) => (
						<React.Fragment key={ques._id}>
							<Accordion.Title
								active={activeIndex === i}
								index={i}
								onClick={onQuestionClick}
							>
								<Icon name="dropdown" />
								{lang === "eng"
									? ques.question
									: ques.question_np
									? ques.question_np
									: ques.question}
							</Accordion.Title>
							<Accordion.Content active={activeIndex === i}>
								<p>
									{lang === "eng"
										? ques.answer
										: ques.answer_np
										? ques.answer_np
										: ques.answer}
								</p>
							</Accordion.Content>
						</React.Fragment>
					))}
				</Accordion>
			) : (
				"No Questions Asked"
			)}
		</div>
	);
};

export default Questions;
