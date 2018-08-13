
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили ' +
            'чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

// var my_news= [];

var Add = React.createClass({

    getInitialState: function() {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true,
        };
    },

    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0){
            this.setState({['' + fieldName]: false})
        } else {
            this.setState({['' + fieldName]: true})
        }
    },

    onButtonClickHandler: function(e){
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert('Автор: ' + author + '\nНовость: ' + text);
    },
    onCheckRuleClick: function(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked})
    },
    render: function () {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return(
            <form className={'add cf'}>
                <input
                    type={'text'}
                    className={'add__author'}
                    onChange={this.onFieldChange.bind(this,'authorIsEmpty')}
                    defaultValue={''}
                    placeholder={'Ваше имя:'}
                    ref={'author'}
                />
                <textarea
                    className={'add__text'}
                    onChange={this.onFieldChange.bind(this,'textIsEmpty')}
                    defaultValue={''}
                    placeholder={'Текст новости:'}
                    ref={'text'}>
                </textarea>
                <label className={'add__checkrule'}>
                       <input type={'checkbox'}
                              // defaultChecked={false}
                              ref={'checkrule'}
                              onChange={this.onCheckRuleClick}
                       />
                       Я согласен с правилами
                </label>
                <button
                    className={'add__btn'}
                    onClick={this.onButtonClickHandler}
                    ref={'alert_button'}
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
                Показать alert
                </button>
            </form>
        );
    }
});

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired,
        })
    },

    getInitialState: function() {
        return {
            visible: false,
            rating: 0,
            eshe_odno_svoistvo: 'qweqwe'
        };
    },

    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true}, function () {
            alert('Состояние визибл изменилось на ' + this.state.visible)

        });
    },

    render: function() {
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        console.log('render', this);

        return (
            <div className="article">
                <p className="news__author">Автор: {author}:</p>
                <p className="news__text">Превью новости: {text}:</p>
                <a href={'#'}
                   onClick={this.readmoreClick}
                   className={"news_readmore " + (visible ? 'none' : '')}>
                    Подробнее
                </a>
                <p className={"news__big-text " + (visible ? '' : 'none')}>Полная новость: {bigText}:</p>
            </div>
        )
    }
})


var News = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            counter: 0
        };
    },

    render: function() {

        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }
        console.log(newsTemplate)
        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count' + (data.length > 0 ? '' : ' none')}>
                    Всего новостей: {data.length}
                    </strong>
            </div>
        );
    }
});


var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <Add/>
                <h3>Новости</h3>
                <News data={my_news}/>
            </div>
    );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);