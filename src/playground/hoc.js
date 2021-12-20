import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please do not share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};
const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Log in buddy or I will come over there</p>
            )}
        </div>
    );
};
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated info="info is here" />, document.getElementById('root'));
