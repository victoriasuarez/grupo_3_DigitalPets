import ContentRowProducts from "./ContentRowProducts";
import UsersInDb from "./UsersInDb";
import LastProductInDb from "./LastProductInDb";

function ContentRowTop() {
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
            </div>

            {/* <!-- Content Row Products--> */}
            <ContentRowProducts />
            {/* <!-- End Products in Data Base --> */}


            {/* <!-- Content Row Last Product in Data Base --> */}
            <div className="row">
                {/* <!-- Last Product in DB --> */}
                <LastProductInDb />
                {/* <!-- End content row last Product in Data Base --> */}

                {/* <!-- Users in DB --> */}
                <UsersInDb />
            </div>
        </div>
    );
}

export default ContentRowTop;