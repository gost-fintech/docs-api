import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy_to_use.svg').default,
    description: (
      <>
        Our platform was designed for very fast and easy to use integrations.
      </>
    ),
  },
  {
    title: 'Improved API & Convenient Documentation',
    Svg: require('@site/static/img/improved_api.svg').default,
    description: (
      <>
        Our API systems are easy to use and integrate.
        Finscender allowed us to make documentations more convenient, easy to read and navigate.
      </>
    ),
  },
  {
    title: 'Powerful SDKs in Popular PLs',
    Svg: require('@site/static/img/sdk_use2.svg').default,
    description: (
      <>
        <i>(coming soon...)</i> We made specific SDKs that are well tailored for most of popular programming languages.
        Allowing developers to intigrate our payment system into their applications more faster and easier.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
