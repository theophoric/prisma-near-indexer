import { PrismaClient } from '@prisma/client'
const util = require('util')

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // const test = await prisma.actionReceipt.findMany({
  //   take: 1,
  //   include: {
  //     actions: true,
  //     outputData: {

  //     }
  //   }
  // })
  const aurora = await prisma.transaction.findMany({
    take: 5,
    skip: 5000,
    include:{
      // receipts: {
      //   take: 5
      // },
      accountChanges: {
        take:5
      },
      includedInBlock: {
        include: {
          authorAccount: true
        }
      },
      includedInChunk: {
        include: {
          authorAccount: true
        }
      },
      signerAccount: true,
      receiverAccount: true,
      convertedIntoReceipt: {
        include: {
          predecessorAccount: true,
          receiverAccount: true,
          accountsCreated: true,
          accountsDeleted: true,
          actionReceipt: {
            include: {
              actions: {
                include: {
                  receiptReceiverAccount: true
                }
              },
              outputData: true,
            }
          },
          dataReceipt: true,
          executionOutcomeReceipt: {
            include: {
              producedReceipt: {
                include: {
                  predecessorAccount: true,
                  receiverAccount: true,
                  accountsCreated: true,
                  accountsDeleted: true,
                  actionReceipt: {
                    include: {
                      actions: {
                        include: {
                          receiptReceiverAccount: true
                        }
                      },
                      outputData: true,
                    }
                  },
                  dataReceipt: true,
                  executionOutcomeReceipt: {
                    include: {
                      producedReceipt: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  console.log(util.inspect(aurora, {colors:true, depth:null}));
  // console.log(util.inspect(test, {colors:true, depth:null}));
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
