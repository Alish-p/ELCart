const Rating = ({ rating, number, color }) => {
  const renderIcon = () => {
    // full => floor(2.5)
    // half => 2.5%1==0
    // empty  => 5-ceil(2.5)
    const filled = Array(Math.floor(rating)).fill('full');
    const half = rating % 1 !== 0 ? ['half'] : [];
    const empty = Array(5 - Math.ceil(rating)).fill('empty');

    const arr = [...filled, ...half, ...empty];

    return arr.map((item, index) => {
      if (item === 'full') return <i key={index} className="fas fa-star" />;
      else if (item === 'empty')
        return <i key={index} className="far fa-star" />;
      else return <i key={index} className="fas fa-star-half-alt" />;
    });
  };

  return (
    <div style={{ color }}>
      {renderIcon()} ({number && number})
    </div>
  );
};

Rating.defaultProps = { color: '#707070', rating: 0 };

export default Rating;
