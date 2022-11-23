const Person = props => {
    return React.createElement('div', {}, [
        React.createElement('h1', {}, props.name),
        React.createElement('p', {}, props.occupation)
    ])
}
const App = () => {
    return React.createElement('div', {}, [
        React.createElement('h1', {class: 'title'}, 'React IS rendered' ),
        React.createElement(Person, {name: 'Mazlan', occupation: 'UX Engineer'}, null),
        React.createElement(Person, {name: 'Azlin', occupation: 'Product Designer'}, null),
        React.createElement(Person, {name: 'Nizam', occupation: 'UX Designer'}, null),
    ]);
};

// ReactDOM.render(
//     React.createElement(App), 
//     document.getElementById('root'));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));