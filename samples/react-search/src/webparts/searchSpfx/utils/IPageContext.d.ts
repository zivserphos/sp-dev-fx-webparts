export interface IPageContext {
    CorrelationId: string;
    ExpFeatures: Array<any>;
    MenuData: IMenuData;
    PreviewFeaturesEnabled: boolean;
    RecycleBinItemCount: number;
    alertsEnabled: boolean;
    allowSilverlightPrompt: boolean;
    blockDownloadExperienceEnabled: boolean;
    cdnPrefix: string;
    clientServerTimeDelta: number;
    crossDomainPhotosEnabled: boolean;
    currentCultureName: string;
    currentLanguage: number;
    currentUICultureName: string;
    disableAppViews: boolean;
    disableFlows: boolean;
    env: string;
    farmLabel: string;
    fid: number;
    groupColor: string;
    groupHasHomepage: boolean;
    groupId: string;
    groupType: string;
    guestsEnabled: boolean;
    hasManageWebPermissions: boolean;
    hideSyncButtonOnODB: boolean;
    isAnonymousGuestUser: boolean;
    isAppWeb: boolean;
    isNoScriptEnabled: boolean;
    isSPO: boolean;
    isSiteAdmin: boolean;
    killSwitches: any;
    layoutsUrl: string;
    listBaseTemplate: number;
    listId: string;
    listPermsMask: any;
    listTitle: string;
    listUrl: string;
    navigationInfo: any;
    nid: number;
    openInClient: boolean;
    pageItemId: number;
    pageListId: string;
    pagePersonalizationScope: number;
    serverRequestPath: string;
    serverTime: string;
    showNGSCDialogForSyncOnODB: boolean;
    siteAbsoluteUrl: string;
    siteClassification: string;
    siteClientTag: string;
    siteId: string;
    sitePagesEnabled: boolean;
    siteServerRelativeUrl: string;
    siteSubscriptionId: string;
    systemUserKey: string;
    tenantAppVersion: string;
    themeCacheToken: string;
    themedCssFolderUrl: string;
    themedImageFileNames: string;
    updateFormDigestPageLoaded: Date;
    userDisplayName: string;
    userId: number;
    userLoginName: string;
    viewId: string;
    viewOnlyExperienceEnabled: boolean;
    webAbsoluteUrl: string;
    webId: string;
    webLanguage: number;
    webLogoUrl: string;
    webPermMasks: any;
    webServerRelativeUrl: string;
    webTemplate: string;
    webTitle: string;
    webUIVersion: string;
}
export interface IMenuData {
    SettingsData: Array<any>;
    SignOutUrl: string;
}
