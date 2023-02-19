import { Component } from 'react';

class Carousel extends Component{
    state = {
        active : 0,
    }

    static defaultProps = {
        images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
    };

    handleIndexClick = (e) => {
        this.setState({
            active: +e.target.dataset.index, // transforma em int
        });
    };

    render(){
        const {active} = this.state;
        const {images} = this.props;

        return(
            <div className="carousel">
                <img src={images[active]} alt="animal active" />
                <div className="carousel-smaller">
                    {images.map((photo, index) =>(
                        // eslint-disable-next-line
                        <img 
                        data-index={index}
                        src={photo}
                        key={photo}
                        onClick={this.handleIndexClick}
                        className={index === active ? 'active' : ''}
                        alt="animal thumbnail"
                        ></img>
                    ))}
                </div>
            </div>
        );
    };
};

export default Carousel;