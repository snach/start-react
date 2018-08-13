
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

var TestInput = React.createClass({

    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },
    onButtonClickHandler: function(e){
        console.log(this.refs);
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
    render: function () {
        return(
            <div>
                <input className={'test-input'}
                       defaultValue={''}
                       placeholder={'введите значение'}
                       ref={'myTestInput'}/>
                <button onClick={this.onButtonClickHandler}
                        ref={'alert_button'}>Показать alert</button>
            </div>
        )
    }
})

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
                <h3>Новости</h3>
                <TestInput/>
                <News data={my_news}/>
            </div>
    );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);