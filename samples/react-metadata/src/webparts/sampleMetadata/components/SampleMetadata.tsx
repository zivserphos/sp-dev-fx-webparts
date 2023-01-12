import * as React from 'react';
import styles from './SampleMetadata.module.scss';
import { ISampleMetadataProps } from './ISampleMetadataProps';
import * as strings from 'SampleMetadataWebPartStrings';

export default class SampleMetadata extends React.Component<ISampleMetadataProps, {}> {
  public render(): React.ReactElement<ISampleMetadataProps> {
    const {
      isDarkTheme,
      hasTeamsContext
    } = this.props;

    return (
      <section className={`${styles.sampleMetadata} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>{strings.WebPartMainHeader}</h2>
          <div>{strings.WebPartSubTitle}</div>
        </div>
        <div>
          <h3>{strings.ConfiguringMetadataHeader}</h3>
          <p>
            {strings.MetadataExplainer}
          </p>
          <h4>{strings.LearnMoreHeader}</h4>
          <ul className={styles.links}>
            <li><a href="https://learn.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-checklist" target="_blank" rel="noreferrer">{strings.PrepareToPublishLink}</a></li>
          </ul>
        </div>
      </section>
    );
  }
}
