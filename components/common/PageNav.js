import { Pagination } from 'antd';

function PageNav(props) {
  const { bigScreen } = props;
  return (
    <Pagination
      // minified version of page nav bar
      size={'small'}
      // starting displayed page of results
      defaultCurrent={1}
      // total TBD by requested data
      total={440}
      // # of items per page responsive to device/screen size
      pageSize={bigScreen ? '40' : '20'}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      showSizeChanger={false}
    />
  );
}

export default PageNav;
