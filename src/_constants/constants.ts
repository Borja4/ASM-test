

export class Constants {
    private readonly clientWebId = "";
    private readonly driveScopes = "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly"
    private readonly googleURI = "https://www.googleapis.com";


    getClientWebId(): String {
        return this.clientWebId;
    }

    getDriveScopes(): String {
        return this.driveScopes;
    }

    getGoogleURI(): String {
        return this.googleURI;
    }
}

export default Constants;