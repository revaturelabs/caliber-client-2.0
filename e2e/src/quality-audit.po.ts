import { browser, by, element } from 'protractor';

export class QualityAuditPage {
  navigateTo() {
    return browser.get('caliber/#/vp/audit');
  }

  getQualityLink() {
    return element(by.css('app-root #quality-link')).getText();
  }

  getToolbarComponent() {
    // return only something on the component
    element(by.css('app-root #quality-link')).click();
    return element(by.css('app-root #year-dropdown')).getText();
  }

  getAssociateComponent() {
    // return only something on the component
    element(by.css('app-root #quality-link')).click();
    return element(by.css('app-root #categories-covered')).getText();
  }

  getOverallComponent() {
    // return only something on the component
    element(by.css('app-root #quality-link')).click();
    return element(by.css('app-root #feedback')).getText();
  }
}
