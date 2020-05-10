import React, {Fragment} from 'react';
import Loading from './loading.gif';

function spinner() {
    return (
        <Fragment>
            <img src={Loading} alt="Loading..." style={{ width : '400px', margin: 'auto', display:'block'}}/>
        </Fragment>
    )
}

export default spinner;