import React from 'react'

export default function understand() {
    return (
        <>
            <div className='understand'>
                <div className='utext'>
                    <h1>
                        <em>
                            Understanding OWASP vulnerabilities is crucial for your application's security and integrity.
                        </em>
                    </h1>
                    <h2>
                        By recognizing these vulnerabilities, you can proactively protect your applications from potential threats. Mitigating these risks not only safeguards your data but also builds trust with your users.
                    </h2>
                    <div className='ctext'>
                        <div className='cbox'>
                            <h1>
                                Critical
                            </h1>
                            <h2>
                                Stay ahead of security threats with our insights.
                            </h2>
                        </div>
                        <div className='cbox'>
                            <h1>
                                Essential
                            </h1>
                            <h2>
                                Protect your users and enhance your app's reputation.
                            </h2>
                        </div>

                    </div>
                </div>
                <div>
                    <div className='uimage'>
                        <img src='public\owasp2025top10.png' alt="" />
                    </div>


                </div>
            </div>

        </>
    )
}
