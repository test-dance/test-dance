import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { Text } from 'ink';
import { Loader } from '../../utils/Loader';
import { Link } from '../../utils/link';

const AppBootstrapLinks: FunctionComponent = () => {
  const [isLoading, setLoading] = useState(true);

  const render = useCallback(() => {
    if (isLoading) {
      return <Loader />
    }

    return (
      <Text>Hello</Text>
    );
  }, []);

  useEffect(() => {
    (async () => {
      await Link.bootstrap();
      setLoading(false);
    })();
  }, []);

  return render();
};

export {
  AppBootstrapLinks
};
